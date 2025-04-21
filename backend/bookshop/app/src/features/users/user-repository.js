const db = require('../../database/mariadb')
const { binaryToUUID } = require('../../shared/utils/convertIds')

const createUser = async (id, email, password, salt) => {
  try {
    console.log(`유저 생성 중: ${id}, ${email}, ${password}, ${salt}`)
    const result = await db.query(
      'INSERT INTO users (id, email, password, salt) VALUES (?, ?, ?, ?)',
      [id, email, password, salt],
    )
    const affectedRows = result[0].affectedRows
    console.log(`${affectedRows}개의 행이 영향받았습니다.`)
    return affectedRows
  } catch (error) {
    throw error
  }
}

findUserById = async (userId) => {
  const [rows] = await db.query('SELECT id, email FROM users WHERE id = ?', [
    userId,
  ])
  return rows.length ? rows[0] : null
}

findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT id, email FROM users WHERE email = ?', [
    email,
  ])
  return rows.length ? rows[0] : null
}

deleteUserById = async (userId) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId])
  return result.affectedRows
}

updateUserById = async (userId, password) => {
  const [result] = await db.query(
    'UPDATE users SET password = ? WHERE id = ? ',
    [password, userId],
  )
  return result.affectedRows
}

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  deleteUserById,
  updateUserById,
}
