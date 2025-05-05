import { useInfiniteQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { fetchBooks } from '../api/books.api'
import { LIMIT } from '../constants/pagination'
import { QUERY_STRING } from '../constants/querystring'

export function useBooksInfinite() {
  const location = useLocation()

  const getBooks = async (context: { pageParam: number }) => {
    const params = new URLSearchParams(location.search)
    const categoryId = params.get(QUERY_STRING.CATEGORY_ID)
      ? Number(params.get(QUERY_STRING.CATEGORY_ID))
      : undefined
    const news = params.get(QUERY_STRING.NEWS) ? true : undefined

    return fetchBooks({
      category_id: categoryId,
      news: news,
      currentPage: context.pageParam,
      limit: LIMIT,
    })
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['books', location.search],
    queryFn: getBooks,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.pagination) return undefined

      const totalPages = Math.ceil(lastPage.pagination.totalCount / LIMIT)
      const nextPage = lastPage.pagination.currentPage + 1

      return nextPage <= totalPages ? nextPage : undefined
    },
    initialPageParam: 1,
  })

  const books = data?.pages.flatMap((page) => page.books) ?? []
  const pagination = data?.pages[data.pages.length - 1]?.pagination ?? {
    currentPage: 1,
    totalCount: 0,
  }
  const isEmpty = books.length === 0

  return {
    books,
    isEmpty,
    isLoading,
    pagination,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
