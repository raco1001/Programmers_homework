const { getBooks, getBookDetail } = require('./book-service')
const { format, subMonths } = require('date-fns')

const getBooksByRange = async (req, res, next) => {
  try {
    const {
      category = 'ALL',
      startDate,
      endDate,
      page = 1,
      limit = 8,
    } = req.query

    const dateData = {
      defaultStartDate: '',
      defaultEndDate: '',
    }

    if (!startDate || !endDate) {
      dateData.defaultStartDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd')
      dateData.defaultEndDate = format(new Date(), 'yyyy-MM-dd')
    } else {
      dateData.defaultStartDate = startDate
      dateData.defaultEndDate = endDate
    }

    const pageInt = parseInt(page, 10)
    const limitInt = parseInt(limit, 10)

    const books = await getBooks({
      category,
      startDate: dateData.defaultStartDate,
      endDate: dateData.defaultEndDate,
      page: pageInt,
      limit: limitInt,
    })

    const counts = books.length
    res.status(200).json({
      status: 'success',
      data: { books: books, page: pageInt, limit: limitInt, counts: counts },
    })
  } catch (error) {
    next(error)
  }
}

const getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id

    let userid = null
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      userid = decoded.id
    }

    if (!bookId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Book ID is required.' })
    }

    const bookDetails = await getBookDetail({ bookId, userid })

    if (bookDetails.bookDetail === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Book not found.' })
    }

    res.status(200).json({ status: 'success', data: bookDetails })
  } catch (error) {
    next(error)
  }
}

module.exports = { getBooksByRange, getBookById }
