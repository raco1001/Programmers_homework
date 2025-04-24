import { useLocation, useSearchParams } from 'react-router-dom'
import { QUERY_STRING } from '../constants/querystring'
import { useEffect, useState } from 'react'
import { IBook } from '../models/book.model'
import { IPagination } from '../models/pagination.model'
import { fetchBooks } from '../api/books.api'
import { LIMIT } from '../constants/pagination'
export const useBooks = () => {
  const location = useLocation()

  const [books, setBooks] = useState<IBook[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalCount: 0,
  })
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(location.search)

    fetchBooks({
      category_id: params.get(QUERY_STRING.CATEGORY_ID)
        ? Number(params.get(QUERY_STRING.CATEGORY_ID))
        : undefined,
      news: params.get(QUERY_STRING.NEWS) ? true : undefined,
      currentPage: params.get(QUERY_STRING.PAGE)
        ? Number(params.get(QUERY_STRING.PAGE))
        : 1,
      limit: LIMIT,
    }).then(({ books, pagination }) => {
      setBooks(books)
      setPagination(pagination)
      setIsEmpty(books.length === 0)
    })
  }, [location.search])

  console.log('Current State:', {
    books: books.length,
    pagination,
    isEmpty,
  })

  return { books, pagination, isEmpty }
}
