const {
  findUserById,
  deleteUserById,
  updateUserById,
  findUserByEmail,
  createUser,
} = require('./user-repository')
const { hashPassword } = require('../auth/auth-utils')
const { generateUUID } = require('../../shared/utils/generateUUID')
const { uuidToBinary } = require('../../shared/utils/convertIds')

const registerUser = async (email, password) => {
  console.log(`[registerUser] 회원가입 요청 받음: ${email}, ${password}`)
  const existingUser = await findUserByEmail(email)
  if (existingUser !== null) {
    throw new Error('Email already exists.')
  }
  console.log(`[registerUser] 이메일 중복 확인 완료: ${email}`)
  const { salt, hashedPassword } = hashPassword(password)
  const uid = generateUUID()
  const bid = uuidToBinary(uid)
  console.log(
    `[registerUser] 유저 생성 중: ${bid}, ${email}, ${hashedPassword}, ${salt}`,
  )
  const affectedRows = await createUser(bid, email, hashedPassword, salt)
  return affectedRows
}

getUser = async (userId) => {
  return await findUserById(userId)
}

getUserByEmail = async (email) => {
  return await findUserByEmail(email)
}

removeUser = async (userId) => {
  return await deleteUserById(userId)
}

updateUserPassword = async (userId, password) => {
  const userBid = uuidToBinary(userId)
  const { hashedPassword } = hashPassword(password)
  return await updateUserById(userBid, hashedPassword)
}

module.exports = {
  registerUser,
  getUser,
  getUserByEmail,
  removeUser,
  updateUserPassword,
}
