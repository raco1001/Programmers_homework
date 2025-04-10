const {
  findUserByEmail,
  storeRefreshToken,
  getStoredRefreshToken,
} = require('./auth-repository')
const { verifyPassword, generateTokens } = require('./auth-utils')
const { binaryToUUID, uuidToBinary } = require('../../shared/utils/convertIds')
const { AuthError } = require('./auth-utils')

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email)

  if (!user || !verifyPassword(password, user[0].salt, user[0].password)) {
    throw new AuthError('Invalid email or password.', 401)
  }

  const userId = binaryToUUID(user[0].id)
  const userName = user[0].name
  const userEmail = user[0].email

  const {
    accessToken,
    refreshToken,
    user: userData,
  } = generateTokens(userId, userName, userEmail)

  const refreshTokenResult = await storeRefreshToken(user[0].id, refreshToken)
  if (refreshTokenResult[0].affectedRows !== 1) {
    throw new AuthError('Failed to store refresh token.', 500)
  }

  return {
    user: userData,
    tokens: { accessToken, refreshToken },
  }
}

const refreshToken = async (userId, userRefreshToken) => {
  if (!userRefreshToken) {
    throw new AuthError('Refresh token is required.', 401)
  }

  const userBId = uuidToBinary(userId)
  const refreshAuthResult = await getStoredRefreshToken(userBId)

  if (!refreshAuthResult) {
    throw new AuthError('User not found.', 404)
  }

  const { email, refresh_token: storedToken, name } = refreshAuthResult

  if (!storedToken || storedToken !== userRefreshToken) {
    throw new AuthError('Invalid refresh token. Please login again.', 401)
  }

  const { accessToken, refreshToken } = generateTokens(userId, name, email)

  const refreshTokenResult = await storeRefreshToken(userBId, refreshToken)
  if (refreshTokenResult[0].affectedRows !== 1) {
    throw new AuthError('Failed to store new refresh token.', 500)
  }

  return {
    accessToken,
    refreshToken,
  }
}

module.exports = {
  authenticateUser,
  refreshToken,
}
