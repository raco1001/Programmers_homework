const {
  findUserById,
  deleteUserById,
  updateUserByEmail,
  findUserByEmail,
  createUser,
} = require('./user-repository')
const { hashPassword } = require('../auth/auth-utils')
const { generateUUID } = require('../../shared/utils/generateUUID')
const { uuidToBinary, binaryToUUID } = require('../../shared/utils/convertIds')

const registerUser = async (email, password) => {
  console.log(`[registerUser] 회원가입 요청 받음: ${email}, ${password}`)
  const existingUser = await findUserByEmail(email)
  if (existingUser !== null) {
    throw new Error('Email already exists.')
  }
  console.log(`[registerUser] 이메일 중복 확인 완료: ${email}`)
  const { salt, hashedPassword } = hashPassword(password)
  const uid = generateUUID()
  console.log('uid+++++++++++++++++: ', uid)

  const bid = uuidToBinary(uid)
  console.log('binaryToUUID+++++++++++++++++: ', binaryToUUID(bid))
  console.log(
    `[registerUser] 유저 생성 중: ${bid}, ${email}, ${hashedPassword}, ${salt}`,
  )
  const affectedRows = await createUser(bid, email, hashedPassword, salt)
  return affectedRows
}

getUser = async (userId) => {
  const [user] = await findUserById(userId)
  return user
}

getUserByEmail = async (email) => {
  return await findUserByEmail(email)
}

removeUser = async (userId) => {
  return await deleteUserById(userId)
}

updateUserPassword = async (email, password) => {
  const userEmail = email
  const { salt, hashedPassword } = hashPassword(password)
  console.log('updateUserPassword \n', hashedPassword, '\n', userEmail)
  const updatedResult = await updateUserByEmail(userEmail, hashedPassword, salt)
  return updatedResult
}

module.exports = {
  registerUser,
  getUser,
  getUserByEmail,
  removeUser,
  updateUserPassword,
}
