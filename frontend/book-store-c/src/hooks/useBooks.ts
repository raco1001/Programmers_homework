import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchBooks } from '../api/books.api'
import { LIMIT } from '../constants/pagination'
import { QUERY_STRING } from '../constants/querystring'
import { IBook } from '../models/book.model'
import { IPagination } from '../models/pagination.model'


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

// export const useBooks = () => {
//   const location = useLocation()

//   const params = new URLSearchParams(location.search)

//   const { data: booksData, isLoading: isBooksLoading } =

//     useQuery({
//       queryKey: ['books', location.search],
//       queryFn: () =>
//         fetchBooks({
//           category_id: params.get(QUERY_STRING.CATEGORY_ID)
//             ? Number(params.get(QUERY_STRING.CATEGORY_ID))
//             : undefined,
//           news: params.get(QUERY_STRING.NEWS)
//             ? true
//             : undefined,
//           currentPage: params.get(QUERY_STRING.PAGE)
//             ? Number(params.get(QUERY_STRING.PAGE))
//             : 1,
//           limit: LIMIT,
//         }),
//     })

//   return {
//     books: booksData?.books,
//     pagination: booksData?.pagination,
//     isEmpty: booksData?.books.length === 0,
//     isLoading: isBooksLoading,
//   }
// }