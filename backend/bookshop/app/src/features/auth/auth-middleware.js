const jwt = require('jsonwebtoken')
const { binaryToUUID } = require('../../shared/utils/convertIds')
const { requestTypes } = require('./entities/returns/auth-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')
const { isTokenBlacklisted, isUserLoggedOut } = require('./token-blacklist')
const { AuthError } = require('./auth-utils')
const { v4: uuidv4 } = require('uuid')
const authLogger = require('./auth-logger')

const addRequestId = (req, res, next) => {
  req.requestId = uuidv4()
  next()
}

const validateJoin = () => {
  return validateSchema(requestTypes.join)
}

const validateLogin = () => {
  return validateSchema(requestTypes.login)
}

const validateRefresh = () => {
  return validateSchema(requestTypes.refresh)
}

const validateAccessToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access Token is required',
      requestId: req.requestId,
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const isBlacklisted = await isTokenBlacklisted(decoded.tokenId)
    if (isBlacklisted) {
      authLogger.logTokenValidationError(
        decoded.tokenId,
        req.requestId,
        'Token has been revoked',
      )
      return res.status(401).json({
        status: 'error',
        message: 'Token has been revoked',
        requestId: req.requestId,
      })
    }

    const isLoggedOut = await isUserLoggedOut(decoded.id, decoded.iat * 1000)
    if (isLoggedOut) {
      authLogger.logTokenValidationError(
        decoded.tokenId,
        req.requestId,
        'User has logged out from all devices',
      )
      return res.status(401).json({
        status: 'error',
        message: 'User has logged out from all devices',
        requestId: req.requestId,
      })
    }

    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      authLogger.logTokenValidationError(
        'unknown',
        req.requestId,
        'Token has expired',
      )
      return res.status(401).json({
        status: 'error',
        message: 'Access Token has expired. Please login again.',
        requestId: req.requestId,
      })
    }
    if (error.name === 'JsonWebTokenError') {
      authLogger.logTokenValidationError(
        'unknown',
        req.requestId,
        'Invalid token',
      )
      return res.status(403).json({
        status: 'error',
        message: 'Invalid Access Token',
        requestId: req.requestId,
      })
    }
    authLogger.logTokenValidationError(
      'unknown',
      req.requestId,
      'Server error during token validation',
    )
    return res.status(500).json({
      status: 'error',
      message: 'Server error during token validation',
      requestId: req.requestId,
    })
  }
}

const validateRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh Token is required. Please login again.',
        requestId: req.requestId,
      })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    const isBlacklisted = await isTokenBlacklisted(decoded.tokenId)
    if (isBlacklisted) {
      authLogger.logTokenValidationError(
        decoded.tokenId,
        req.requestId,
        'Refresh token has been revoked',
      )
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token has been revoked',
        requestId: req.requestId,
      })
    }

    const isLoggedOut = await isUserLoggedOut(decoded.id, decoded.iat * 1000)
    if (isLoggedOut) {
      authLogger.logTokenValidationError(
        decoded.tokenId,
        req.requestId,
        'User has logged out from all devices',
      )
      return res.status(401).json({
        status: 'error',
        message: 'User has logged out from all devices',
        requestId: req.requestId,
      })
    }

    req.userId = binaryToUUID(decoded.id)
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      authLogger.logTokenValidationError(
        'unknown',
        req.requestId,
        'Refresh token has expired',
      )
      return res.status(401).json({
        status: 'error',
        message: 'Refresh Token has expired. Please login again.',
        requestId: req.requestId,
      })
    }
    authLogger.logTokenValidationError(
      'unknown',
      req.requestId,
      'Invalid refresh token',
    )
    return res.status(403).json({
      status: 'error',
      message: 'Invalid Refresh Token. Please login again.',
      requestId: req.requestId,
    })
  }
}

module.exports = {
  validateAccessToken,
  validateRefreshToken,
  validateJoin,
  validateLogin,
  validateRefresh,
  addRequestId,
}
