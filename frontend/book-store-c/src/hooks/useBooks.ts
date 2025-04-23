import { useLocation, useSearchParams } from 'react-router-dom'
import { QUERY_STRING } from '../constants/querystring'
import { useEffect, useState } from 'react'
import { IBook } from '../models/book.model'
import { IPagenation } from '../models/pagenation.model'
import { fetchBooks } from '../api/books.api'
import { LIMIT } from '../constants/pagination'
export const useBooks = () => {
  const location = useLocation()

  const [books, setBooks] = useState<IBook[]>([])
  const [pagenation, setPagenation] = useState<IPagenation>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  })

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
    }).then((data) => {
      console.log('fetchBooks 호출 후', JSON.stringify(data))
      setBooks(data.books)
      setPagenation(data.pagenation)
    })
  }, [location.search])
  console.log('fetchBooks 호출 후', books, pagenation)

  return { books, pagenation }
}
