import { styled } from 'styled-components'
import BooksFilter from '../components/books/BooksFilter'
import BooksList from '../components/books/BooksList'
import BooksViewSwitcher from '../components/books/BooksViewSwitcher'
import Pagination from '../components/books/Pagination'
import Title from '../components/common/Title'
function Books() {
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <BooksFilter />
        <BooksViewSwitcher />
        <BooksList />
        <BooksFilter />
        <Pagination />
      </BooksStyle>
    </>
  )
}

const BooksStyle = styled.div`
  width: 100%;
  height: 100%;
`

export default Books
