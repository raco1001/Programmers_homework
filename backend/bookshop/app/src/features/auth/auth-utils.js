const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const rateLimit = require('express-rate-limit')
const { v4: uuidv4 } = require('uuid')

const generateAccessToken = (user) => {
  const tokenId = uuidv4()
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      type: 'access',
      tokenId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: config.jwt.accessToken.expiresIn,
      issuer: 'jonghyun',
    },
  )
}

const generateRefreshToken = (userId) => {
  const tokenId = uuidv4()
  return jwt.sign(
    {
      id: userId,
      type: 'refresh',
      tokenId,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: config.jwt.refreshToken.expiresIn,
      issuer: 'jonghyun',
    },
  )
}

const hashPassword = (password) => {
  try {
    const salt = crypto.randomBytes(16).toString('base64')
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('base64')
    return { salt, hashedPassword }
  } catch (error) {
    throw error
  }
}

const verifyPassword = (password, salt, storedPassword) => {
  try {
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('base64')
    return hashedPassword === storedPassword
  } catch (error) {
    throw error
  }
}

const generateTokens = (id, name, email) => {
  const user = { id, name, email }
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(id)

  return {
    accessToken,
    refreshToken,
    user: { id, name, email },
  }
}

const requireAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ status: 'error', message: '관리자 권한이 필요합니다.' })
    }
    next()
  } catch (error) {
    throw error
  }
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 'error',
    message: 'Too many login attempts, please try again later',
  },
})

const refreshLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    status: 'error',
    message: 'Too many refresh attempts, please try again later',
  },
})

const registerLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: {
    status: 'error',
    message: 'Too many registration attempts, please try again later',
  },
})

const validatePassword = (password) => {
  try {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*]/.test(password)

    if (password.length < minLength) {
      throw new Error('Password must be at least 8 characters long')
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      throw new Error(
        'Password must contain uppercase, lowercase, numbers and special characters',
      )
    }
  } catch (error) {
    throw error
  }
}

class AuthError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const config = {
  jwt: {
    accessToken: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
  },
  password: {
    saltLength: 16,
    iterations: 1000,
    keyLength: 64,
    digest: 'sha512',
  },
}

const validateConfig = () => {
  try {
    if (!config.jwt.accessToken.secret || !config.jwt.refreshToken.secret) {
      throw new Error('JWT secrets must be configured')
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  requireAdmin,
  loginLimiter,
  refreshLimiter,
  registerLimiter,
  validatePassword,
  validateConfig,
  AuthError,
  config,
}
