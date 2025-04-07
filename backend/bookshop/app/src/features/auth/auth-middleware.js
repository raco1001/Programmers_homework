const jwt = require('jsonwebtoken')
const { binaryToUUID } = require('../../shared/utils/convertIds')
const { requestTypes } = require('./auth-entities')
const validateSchema = require('../../shared/middlewares/validateSchema')

const validateJoin = () => {
  return validateSchema(requestTypes.join)
}

const validateLogin = () => {
  return validateSchema(requestTypes.login)
}

const validateRefresh = () => {
  return validateSchema(requestTypes.refresh)
}

const validateAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access Token is required',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Access Token has expired. Please login again.',
      })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid Access Token',
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Server error during token validation',
    })
  }
}

const validateRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh Token is required. Please login again.',
      })
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            status: 'error',
            message: 'Refresh Token has expired. Please login again.',
          })
        }
        return res.status(403).json({
          status: 'error',
          message: 'Invalid Refresh Token. Please login again.',
        })
      }
      req.userId = binaryToUUID(decoded.id)
      next()
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Server error during token validation',
    })
  }
}

module.exports = {
  validateAccessToken,
  validateRefreshToken,
  validateJoin,
  validateLogin,
  validateRefresh,
}
