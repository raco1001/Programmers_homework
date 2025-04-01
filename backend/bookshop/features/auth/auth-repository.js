const db = require('../../app/database/mariadb')

const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, password, salt FROM users WHERE email = ?',
      [email],
    )
    return rows
  } catch (error) {
    console.error(`[findUserByEmail] 오류 발생: ${error.message}`)
    throw error
  }
}

const storeRefreshToken = async (userId, refreshToken) => {
  try {
    const result = await db.query(
      'UPDATE users SET refresh_token = ? WHERE id = ?',
      [refreshToken, userId],
    )
    return result
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
  storeRefreshToken,
  getStoredRefreshToken,
}
