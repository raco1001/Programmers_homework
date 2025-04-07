const express = require('express')
const router = express.Router()
const { validateJoin } = require('./user-middleware')
const {
  register,
  getUserById,
  deleteUser,
  authenticatUserByEmail,
  resetPassword,
} = require('./user-controller')

const {
  validateRequest,
} = require('../../shared/middlewares/validateRequestBody')
const { validateAccessToken } = require('../auth/auth-middleware')

router.post('/join', validateAccessToken, validateJoin, register)

router
  .route('/:id')
  .get(validateAccessToken, getUserById)
  .delete(validateAccessToken, deleteUser)

router
  .route('/reset/:email')
  .get(validateAccessToken, validateRequest, authenticatUserByEmail)

router.route('/reset/:id').put(validateAccessToken, resetPassword)

module.exports = router
