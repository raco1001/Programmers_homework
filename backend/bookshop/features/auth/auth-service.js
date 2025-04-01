const {
  findUserByEmail,
  storeRefreshToken,
  getStoredRefreshToken,
} = require('./auth-repository')
const { verifyPassword, generateTokens } = require('./auth-utils')
const { binaryToUUID, uuidToBinary } = require('../../shared/utils/convertIds')

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email)
  console.log(user)
  if (!user || !verifyPassword(password, user[0].salt, user[0].password)) {
    throw new Error('Invalid email or password.')
  }
  const userId = binaryToUUID(user[0].id)
  const userName = user[0].name
  const userEmail = user[0].email
  const { accessToken, refreshToken } = generateTokens(
    userId,
    userName,
    userEmail,
  )
  const refreshTokenResult = await storeRefreshToken(user[0].id, refreshToken)
  if (refreshTokenResult[0].affectedRows == 1) {
    return { userId, userName, accessToken, refreshToken }
  } else {
    throw new Error('Failed to store refresh token.')
  }
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

module.exports = { authenticateUser, refreshToken }
