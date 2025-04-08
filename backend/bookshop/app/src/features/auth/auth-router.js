const express = require('express')
const router = express.Router()
const {
  validateAccessToken,
  validateRefreshToken,
  validateLogin,
  addRequestId,
} = require('./auth-middleware')
const {
  login,
  updateRefreshToken,
  logout,
  logoutFromAllDevices,
  handleAuthError,
} = require('./auth-controller')
const {
  loginLimiter,
  refreshLimiter,
  registerLimiter,
} = require('./auth-utils')

router.use(addRequestId)

router.post('/login', loginLimiter, validateLogin, login)
router.post(
  '/refresh',
  refreshLimiter,
  validateRefreshToken,
  updateRefreshToken,
)
router.post('/logout', validateAccessToken, logout)
router.post('/logout-all-devices', validateAccessToken, logoutFromAllDevices)

// Error handling middleware
router.use(handleAuthError)

module.exports = router
