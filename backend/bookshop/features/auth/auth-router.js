const express = require('express')
const router = express.Router()
const {
  validateAccessToken,
  validateRefreshToken,
  validateJoin,
  validateLogin,
} = require('./auth-middleware')
const {
  register,
  login,
  updateRefreshToken,
  logout,
} = require('./auth-controller')

router.post('/join', validateJoin(), register)

router.post('/login', validateLogin(), login)

router.post('/refresh', validateRefreshToken, updateRefreshToken)

router.post('/logout', validateAccessToken, logout)

module.exports = router
