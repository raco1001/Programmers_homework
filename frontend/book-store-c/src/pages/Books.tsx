import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { styled } from 'styled-components'
import BooksEmpty from '../components/books/BooksEmpty'
import BooksFilter from '../components/books/BooksFilter'
import BooksList from '../components/books/BooksList'
import BooksViewSwitcher from '../components/books/BooksViewSwitcher'
import Title from '../components/common/Title'
import { useBooksInfinite } from '../hooks/useBooksInfinite'
// import Loading from '../components/common/Loading'

function Books() {
  const { books, isEmpty, pagination, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBooksInfinite()

  // const moreRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         loadMore()
  //         observer.unobserve(entry.target)
  //       }
  //     })
  //   })
  //   if (moreRef.current) {
  //     observer.observe(moreRef.current)
  //   }
  //   return () => observer.disconnect()
  // }, [books, moreRef])
  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
      loadMore()
    }
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  })

  if (isEmpty) {
    return <BooksEmpty />
  }

  // if (!books || !pagination || isLoading) {
  //   return <Loading />
  // }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="books-header">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <div>
          {!isEmpty && <BooksList books={books} />}
          {isEmpty && <BooksEmpty />}
          {/* {!isEmpty && <Pagination pagination={pagination} />} */}
          {hasNextPage && (
            <div className="load-more-button" ref={moreRef}>
              {/* <Button
                size="medium"
                schema="normal"
                onClick={loadMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? '불러오는 중...' : '더보기'}
              </Button> */}
            </div>
          )}
        </div>
      </BooksStyle>
    </>
  )
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 0;

  .books-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

export default Books
