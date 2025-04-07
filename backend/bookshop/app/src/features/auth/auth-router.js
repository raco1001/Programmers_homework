const express = require('express')
const router = express.Router()
const {
  validateAccessToken,
  validateRefreshToken,
  validateLogin,
} = require('./auth-middleware')
const { login, updateRefreshToken, logout } = require('./auth-controller')

router.post('/login', validateLogin, login)

router.post('/refresh', validateRefreshToken, updateRefreshToken)

router.post('/logout', validateAccessToken, logout)

module.exports = router
