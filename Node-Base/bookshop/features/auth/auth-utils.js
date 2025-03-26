const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const rateLimit = require('express-rate-limit')

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h', issuer: 'jonghyun' },
  )
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'jonghyun',
  })
}

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('base64')
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('base64')
  return { salt, hashedPassword }
}

const verifyPassword = (password, salt, hashedPassword) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('base64')
  return hash === hashedPassword
}

const generateTokens = (id, name, email) => {
  const accessToken = generateAccessToken({
    id,
    name,
    email,
  })
  const refreshToken = generateRefreshToken(id)
  return { accessToken, refreshToken }
}

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ status: 'error', message: '관리자 권한이 필요합니다.' })
  }
  next()
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
})

const validatePassword = (password) => {
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
  if (!config.jwt.accessToken.secret || !config.jwt.refreshToken.secret) {
    throw new Error('JWT secrets must be configured')
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
  validatePassword,
  validateConfig,
}
