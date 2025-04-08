const Redis = require('ioredis')
const { AuthError } = require('./auth-utils')

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  keyPrefix: 'auth:blacklist:',
})

/**
 * Add a token to the blacklist
 * @param {string} tokenId - The unique ID of the token
 * @param {number} expiresIn - Time in seconds until the token expires
 * @returns {Promise<void>}
 */
const blacklistToken = async (tokenId, expiresIn) => {
  try {
    // Store the token ID in Redis with expiration
    await redis.set(tokenId, 'blacklisted', 'EX', expiresIn)
  } catch (error) {
    console.error('Error blacklisting token:', error)
    throw new AuthError('Failed to blacklist token', 500)
  }
}

/**
 * Check if a token is blacklisted
 * @param {string} tokenId - The unique ID of the token
 * @returns {Promise<boolean>} - True if the token is blacklisted
 */
const isTokenBlacklisted = async (tokenId) => {
  try {
    const exists = await redis.exists(tokenId)
    return exists === 1
  } catch (error) {
    console.error('Error checking blacklisted token:', error)
    throw new AuthError('Failed to check blacklisted token', 500)
  }
}

/**
 * Blacklist all tokens for a user (for logout from all devices)
 * @param {string} userId - The user ID
 * @returns {Promise<void>}
 */
const blacklistAllUserTokens = async (userId) => {
  try {
    // Store a timestamp for the user's logout
    await redis.set(`user:${userId}:logout`, Date.now().toString())
  } catch (error) {
    console.error('Error blacklisting all user tokens:', error)
    throw new AuthError('Failed to blacklist all user tokens', 500)
  }
}

/**
 * Check if a user has logged out from all devices
 * @param {string} userId - The user ID
 * @param {number} tokenIssuedAt - The timestamp when the token was issued
 * @returns {Promise<boolean>} - True if the token was issued before the user logged out
 */
const isUserLoggedOut = async (userId, tokenIssuedAt) => {
  try {
    const logoutTimestamp = await redis.get(`user:${userId}:logout`)
    if (!logoutTimestamp) return false

    // If the token was issued before the user logged out, it's still valid
    return parseInt(logoutTimestamp) > tokenIssuedAt
  } catch (error) {
    console.error('Error checking user logout status:', error)
    throw new AuthError('Failed to check user logout status', 500)
  }
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
  blacklistAllUserTokens,
  isUserLoggedOut,
}
