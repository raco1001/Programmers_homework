const express = require('express')
const router = express.Router()
const { createPayment, addPaymentProvider } = require('./payment-controller')

router.route('/').post(createPayment)

router.route('/providers').post(addPaymentProvider)

module.exports = router
