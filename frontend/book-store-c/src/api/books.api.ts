import { IBook, IBookDetail } from '../models/book.model'
import { IPagination } from '../models/pagination.model'
import { httpClient } from './http'
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

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params: params,
    })
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

interface FetchBookDetailResponse {
  bookDetail: IBookDetail
}

export const fetchBookDetail = async (bookId: string) => {
  try {
    const response = await httpClient.get<FetchBookDetailResponse>(
      `/books/${bookId}`,
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const likeBook = async (bookId: string) => {
  try {
    const response = await httpClient.post(`/likes/${bookId}`)
    if (!response.data) {
      throw new Error('No data received from likeBook API')
    }
    return response.data
  } catch (error) {
    console.error('Error in likeBook:', error)
    throw error
  }
}

export const unlikeBook = async (bookId: string) => {
  try {
    const response = await httpClient.delete(`/likes/${bookId}`)
    if (!response.data) {
      throw new Error('No data received from unlikeBook API')
    }
    return response.data
  } catch (error) {
    console.error('Error in unlikeBook:', error)
    throw error
  }
}

export const fetchBestBooks = async () => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books/best')
    return response.data
  } catch (error) {
    throw error
  }
}
