const express = require('express')
const router = express.Router()
const { getBooksByRange, getBookById } = require('./book-controller')

router.route('/').get(getBooksByRange)

router.route('/:bookId').get(getBookById)

module.exports = router
