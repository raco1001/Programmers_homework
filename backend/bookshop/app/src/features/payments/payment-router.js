const express = require('express')
const router = express.Router()
const { createPayment, addPaymentProvider } = require('./payment-controller')
const { validateAccessToken } = require('../auth/auth-middleware')

router.route('/').post(validateAccessToken, createPayment)

router.route('/providers').post(validateAccessToken, addPaymentProvider)

module.exports = router
