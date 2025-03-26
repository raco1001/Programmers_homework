const {
  findUserByEmail,
  createUser,
  storeRefreshToken,
  getStoredRefreshToken,
} = require('./auth-repository')
const { hashPassword, verifyPassword, generateTokens } = require('./auth-utils')
const { generateUUID } = require('../../shared/utils/generateUUID')
const { binaryToUUID, uuidToBinary } = require('../../shared/utils/convertIds')

const registerUser = async (name, email, password) => {
  console.log(
    `[registerUser] 요청 받음!!!!!!!!!!!: ${name}, ${email}, ${password}`,
  )
  const existingUser = await findUserByEmail(email)
  console.log(existingUser)
  if (existingUser !== null) {
    throw new Error('Email already exists.')
  }

  const { salt, hashedPassword } = hashPassword(password)
  const { uid } = generateUUID()
  const { bid } = uuidToBinary(uid)

  const affectedRows = await createUser(bid, name, email, hashedPassword, salt)
  console.log(`[registerUser] 영향받은 행 수: ${affectedRows}`)
  return affectedRows
}

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email)
  if (!user || !verifyPassword(password, user.salt, user.password)) {
    throw new Error('Invalid email or password.')
  }
  console.log(user.id)
  const userId = binaryToUUID(user.id)
  console.log(userId)

  const userName = user.name
  const userEmail = user.email
  console.log(userId, userName, userEmail)
  const { accessToken, refreshToken } = generateTokens(
    userId,
    userName,
    userEmail,
  )

  await storeRefreshToken(user.id, refreshToken)

  return { userId, userName, accessToken, refreshToken }
}

const refreshToken = async (userId, userRefreshToken) => {
  if (!userRefreshToken) throw new Error('Empty: Refresh Token')

  const userBId = uuidToBinary(userId)
  const refreshAuthResult = await getStoredRefreshToken(userBId)
  const email = refreshAuthResult.email
  const storedToken = refreshAuthResult.refresh_token
  const name = refreshAuthResult.name

  if (!storedToken || storedToken !== userRefreshToken) {
    throw new Error('Invalid Refresh Token. Please login again!')
  }

  return generateAccessToken({ id: userId, email, name })
}

module.exports = { registerUser, authenticateUser, refreshToken }
