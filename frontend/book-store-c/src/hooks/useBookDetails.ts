import { fetchBookDetail, likeBook, unlikeBook } from '@/api/books.api'
import { addCart } from '@/api/carts.api'
import { addReview, fetchBookReviews } from '@/api/review.api'
import { useToast } from '@/hooks/useToast'
import { BookReviewItemWrite, IBookDetail, IBookReviewItem } from '@/models/book.model'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { useAlert } from './useAlert'

export const useBookDetail = (bookId: string | undefined) => {
  const [bookDetail, setBookDetail] = useState<IBookDetail | null>(null)
  const [cartAdded, setCartAdded] = useState<boolean>(false)
  const { isLoggedIn } = useAuthStore.getState()
  const { showAlert, showConfirm } = useAlert()
  const { showToast } = useToast()
  const [reviews, setReviews] = useState<IBookReviewItem[]>([])

  const likeToggle = async () => {
    if (!isLoggedIn) {
      showAlert('로그인 후 이용해주세요.')
      return
    }
    if (bookDetail?.isLiked === undefined) {
      showAlert('좋아요 데이터가 없습니다.')
      return
    }

    try {
      if (bookDetail?.isLiked) {
        await unlikeBook(bookDetail.id)
        setBookDetail({
          ...bookDetail,
          isLiked: false,
          likes: bookDetail.likes - 1,
        })
        showToast('좋아요가 취소되었습니다.', 'info', { replacePrevious: true })
      } else {
        await likeBook(bookDetail.id)
        setBookDetail({
          ...bookDetail,
          isLiked: true,
          likes: bookDetail.likes + 1,
        })
        showToast('좋아요가 추가되었습니다.', 'info', { replacePrevious: true })
      }
    } catch (error) {
      console.error('Like toggle error:', error)
      showAlert(
        `좋아요 처리 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  const handleAddToCart = (quantity: number) => {
    if (!bookDetail) return
    addCart({ productId: bookDetail.id, quantity: quantity }).then(() => {
      setCartAdded(true)
      setTimeout(() => {
        setCartAdded(false)
      }, 3000)
    })
  }

  useEffect(() => {
    if (!bookId) return
    fetchBookDetail(bookId)
      .then((response) => {
        setBookDetail(response.bookDetail)
      })
      .catch((error) => {
        console.error('Error fetching book details:', error)
        showAlert('책 정보를 불러오는 중 오류가 발생했습니다.')
      })

    fetchBookReviews(bookId)
      .then((reviews) => {
        setReviews(reviews)
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error)
      })
  }, [bookId])

  const addBookReview = async (data: BookReviewItemWrite) => {
    if (!bookId) return
    try {
      const newReview = await addReview(bookId, data)
      setReviews(prevReviews => [newReview, ...prevReviews])
    } catch (error) {
      console.error('Error adding review:', error)
      showAlert('리뷰 작성 중 오류가 발생했습니다.')
    }
  }

  return { bookDetail, likeToggle, handleAddToCart, cartAdded, reviews, addBookReview }
}

export default useBookDetail
