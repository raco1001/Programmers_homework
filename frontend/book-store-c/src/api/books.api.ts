import { httpClient } from './http'
import { IBook, IBookDetail } from '../models/book.model'
import { IPagination } from '../models/pagination.model'
interface FetchBooksParams {
  category_id?: number
  news?: boolean
  currentPage?: number
  limit?: number
}

interface FetchBooksResponse {
  books: IBook[]
  pagination: IPagination
}

export const fetchBooks = async (
  params: FetchBooksParams,
): Promise<FetchBooksResponse> => {
  try {
    const response = await httpClient.get('/books', { params: params })
    return response.data
  } catch (error) {
    return {
      books: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
      },
    }
  }
}

export const fetchBookDetail = async (bookId: string): Promise<IBookDetail> => {
  try {
    const response = await httpClient.get<IBookDetail>(`/books/${bookId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
