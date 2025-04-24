import { useEffect } from 'react'
import { useState } from 'react'
import { IBookDetail } from '../models/book.model'
import { fetchBookDetail } from '../api/books.api'

export const useBookDetail = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null)

  useEffect(() => {
    if (!bookId) return
    fetchBookDetail(bookId).then((book) => {
      setBook(book.bookDetail)
    })
  }, [bookId])
  return { book }
}

export default useBookDetail
