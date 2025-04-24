import { styled } from 'styled-components'
import BooksFilter from '../components/books/BooksFilter'
import BooksList from '../components/books/BooksList'
import BooksViewSwitcher from '../components/books/BooksViewSwitcher'
import Pagination from '../components/books/Pagination'
import Title from '../components/common/Title'
import BooksEmpty from '../components/books/BooksEmpty'
import { useBooks } from '../hooks/useBooks'

function Books() {
  const { books, pagination, isEmpty } = useBooks()

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
          {!isEmpty && <Pagination pagination={pagination} />}
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
