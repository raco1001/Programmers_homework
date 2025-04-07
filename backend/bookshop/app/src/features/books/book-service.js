const { findBooks, findBookDetail } = require('./book-repository')
const { uuidToBinary } = require('../../shared/utils/convertIds')

const getBooks = async ({ params }) => {
  const rows = await findBooks(params)
  const books = rows.foundRows
  const rowsCount = rows.foundRows.length

  return {
    page: params.page,
    totalRows: rowsCount,
    books: books,
  }
}

const getBookDetail = async ({ bookId, userId }) => {
  const bookBid = uuidToBinary(bookId)
  const userBid = userId ? uuidToBinary(userId) : null
  const bookDetails = await findBookDetail(bookBid, userBid)
  bookDetails[0].id = bookId
  return {
    bookDetail: bookDetails[0],
    categoryPath: bookDetails[1],
  }
}

module.exports = { getBooks, getBookDetail }
