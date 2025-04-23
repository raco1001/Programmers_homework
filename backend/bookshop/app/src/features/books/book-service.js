const {
  findBooks,
  findBookDetail,
  getBooksTotalCount,
} = require('./book-repository')
const { uuidToBinary } = require('../../shared/utils/convertIds')
const { format, subMonths } = require('date-fns')

const getBooks = async ({ params }) => {
  try {
    const {
      keyword = '',
      category_id = 'ALL',
      startDate,
      endDate,
      currentPage = 1,
      limit = 8,
    } = params

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

    const currentPageInt = parseInt(currentPage, 10)
    const limitInt = parseInt(limit, 10)

    const books = await findBooks({
      keyword: keyword,
      category_id: category_id,
      startDate: dateData.defaultStartDate,
      endDate: dateData.defaultEndDate,
      currentPage: currentPageInt,
      limit: limitInt,
    })
    const totalCount = await getBooksTotalCount({
      keyword: keyword,
      category_id: category_id,
      startDate: dateData.defaultStartDate,
      endDate: dateData.defaultEndDate,
    })

    return {
      books: books,
      pagenation: {
        totalCount: totalCount,
        totalPages: totalCount > 0 ? Math.ceil(totalCount / limitInt) : 1,
        currentPage: currentPageInt,
      },
    }
  } catch (error) {
    console.error('Error in getBooks service:', error)
    throw error
  }
}

const getBookDetail = async ({ bookId, userId }) => {
  try {
    if (!bookId) {
      throw new Error('Book ID is required')
    }

    const bookBid = uuidToBinary(bookId)
    const userBid = userId ? uuidToBinary(userId) : null

    const bookDetails = await findBookDetail(bookBid, userBid)

    if (!bookDetails.bookDetail) {
      return { bookDetail: null, categoryPath: [] }
    }

    bookDetails.bookDetail.id = bookId

    return bookDetails
  } catch (error) {
    console.error('Error in getBookDetail service:', error)
    throw error
  }
}

module.exports = { getBooks, getBookDetail }
