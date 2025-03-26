const db = require('../../app/database/mariadb')

const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, password, salt FROM users WHERE email = ?',
      [email],
    )
    console.log(rows[0])
    return rows[0]
  } catch (error) {
    console.error(`[findUserByEmail] 오류 발생: ${error.message}`)
    throw error
  }
}

const createUser = async (id, name, email, password, salt) => {
  try {
    console.log(`유저 생성 중: ${id}, ${name}, ${email}, ${password}, ${salt}`)
    const result = await db.query(
      'INSERT INTO users (id, name, email, password, salt) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password, salt],
    )
    const affectedRows = result[0].affectedRows
    console.log(`${affectedRows}`)
    return affectedRows
  } catch (error) {
    throw error
  }
}

const storeRefreshToken = async (userId, refreshToken) => {
  try {
    await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [
      refreshToken,
      userId,
    ])
  } catch (error) {
    throw error
  }
}

const getStoredRefreshToken = async (userId) => {
  try {
    const [rows] = await db.query(
      'SELECT email, name, refresh_token FROM users WHERE id = ?',
      [userId],
    )
    return rows.length > 0 ? rows[0] : null
  } catch (error) {
    throw error
  }
}

const deleteRefreshToken = async (userId) => {
  try {
    await db.query('UPDATE users SET refresh_token = NULL WHERE id = ?', [
      userId,
    ])
  } catch (error) {
    throw error
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  storeRefreshToken,
  getStoredRefreshToken,
}
