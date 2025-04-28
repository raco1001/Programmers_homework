import { useEffect } from 'react'
import { useState } from 'react'
import { IBookDetail } from '../models/book.model'
import { fetchBookDetail, likeBook, unlikeBook } from '../api/books.api'
import { useAuthStore } from '../store/authStore'
import { useAlert } from './useAlert'
import { addCart } from '../api/carts.api'
export const useBookDetail = (bookId: string | undefined) => {
  const [bookDetail, setBookDetail] = useState<IBookDetail | null>(null)
  const [cartAdded, setCartAdded] = useState<boolean>(false)
  const { isLoggedIn } = useAuthStore.getState()
  const { showAlert, showConfirm } = useAlert()
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
      } else {
        await likeBook(bookDetail.id)

        setBookDetail({
          ...bookDetail,
          isLiked: true,
          likes: bookDetail.likes + 1,
        })
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
    addCart({ bookId: bookDetail.id, quantity: quantity }).then(() => {
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
  }, [bookId])
  return { bookDetail, likeToggle, handleAddToCart, cartAdded }
}

export default useBookDetail
