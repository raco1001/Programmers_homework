const {
  findUserByEmail,
  storeRefreshToken,
  getStoredRefreshToken,
} = require('./auth-repository')
const { verifyPassword, generateTokens } = require('./auth-utils')
const { binaryToUUID, uuidToBinary } = require('../../shared/utils/convertIds')
const { AuthError } = require('./auth-utils')
const { blacklistToken, blacklistAllUserTokens } = require('./token-blacklist')
const jwt = require('jsonwebtoken')

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

  try {
    const decoded = jwt.verify(userRefreshToken, process.env.JWT_REFRESH_SECRET)
    const expiresIn = Math.ceil(decoded.exp - decoded.iat)
    await blacklistToken(decoded.tokenId, expiresIn)
  } catch (error) {
    console.error('Error blacklisting old refresh token:', error)
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

const logout = async (userId, refreshToken) => {
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const expiresIn = Math.ceil(decoded.exp - decoded.iat)
      await blacklistToken(decoded.tokenId, expiresIn)
    } catch (error) {
      console.error('Error blacklisting refresh token during logout:', error)
    }
  }

  return { success: true }
}

const logoutFromAllDevices = async (userId) => {
  try {
    await blacklistAllUserTokens(userId)
    return { success: true }
  } catch (error) {
    console.error('Error during logout from all devices:', error)
    throw new AuthError('Failed to logout from all devices.', 500)
  }
}

module.exports = {
  authenticateUser,
  refreshToken,
  logout,
  logoutFromAllDevices,
}
