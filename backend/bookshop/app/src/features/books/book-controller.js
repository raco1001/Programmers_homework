const { getBooks, getBookDetail } = require('./book-service')
const { BooksReturns } = require('./entities/returns/BooksReturns')
const { BookDetailReturn } = require('./entities/returns/BookDetailsReturns')
const jwt = require('jsonwebtoken')

const getBooksByRange = async (req, res, next) => {
  try {
    const books = await getBooks({ params: req.query })
    console.log(
      'books+++++++++++++++++CONTROLLER+++++++++++++++++++++++++++',
      books,
    )
    res.status(200).json(BooksReturns.fromRawData(books))
  } catch (error) {
    console.error('Error in getBooksByRange controller:', error)
    next(error)
  }
}

const getBookById = async (req, res, next) => {
  try {
    if (!req.params.bookId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Book ID is required.' })
    }
    const bookId = req.params.bookId

    let userId = undefined
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        userId = decoded.id
      } catch (err) {
        console.warn('Invalid token, proceeding without userId')
      }
    }
    console.log(
      'userId++++++++++++++++CONTROLLER+++++++++++++++++++++++++++',
      userId,
    )
    const bookDetail = await getBookDetail({ bookId, userId })
    console.log(
      'bookDetail++++++++++++++++CONTROLLER+++++++++++++++++++++++++++',
      bookDetail,
    )
    if (!bookDetail) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Book not found.' })
    }

    res.status(200).json({ bookDetail: bookDetail })
  } catch (error) {
    console.error('Error in getBookById controller:', error)
    next(error)
  }
}

module.exports = { getBooksByRange, getBookById }
