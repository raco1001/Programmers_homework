import { BookReviewItemWrite, IBookReviewItem } from "@/models/book.model"
import { requestHandler } from "./http"

export const fetchBookReviews = async (bookId: string): Promise<IBookReviewItem[]> => {
  try {
    const response = await requestHandler<IBookReviewItem[]>('GET', `/reviews/${bookId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching book reviews:', error)
    return []
  }
}


export const addReview = async (bookId: string, data: BookReviewItemWrite): Promise<IBookReviewItem> => {
  try {
    const response = await requestHandler('POST', `/reviews/${bookId}`, data)
    return response.data
  } catch (error) {
    console.error('Error adding review:', error)
    throw error
  }
}

export const fetchMainReviews = async (): Promise<IBookReviewItem[]> => {
  try {
    const response = await requestHandler<IBookReviewItem[]>('GET', '/reviews')
    return response.data
  } catch (error) {
    console.error('Error fetching main reviews:', error)
    return []
  }
}
