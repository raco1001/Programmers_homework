import { httpClient } from './http'
import { IBook } from '../models/book.model'
import { IPagenation } from '../models/pagenation.model'
interface FetchBooksParams {
  category_id?: number
  news?: boolean
  currentPage?: number
  limit?: number
}

interface FetchBooksResponse {
  books: IBook[]
  pagenation: IPagenation
}

export const fetchBooks = async (
  params: FetchBooksParams,
): Promise<FetchBooksResponse> => {
  try {
    const response = await httpClient.get('/books/lists', { params: params })
    console.log(response.data)
    return response.data
  } catch (error) {
    return {
      books: [],
      pagenation: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
      },
    }
  }
}
