import { styled } from 'styled-components'
import { IBook } from '../../models/book.model'
import BookItem from './BookItem'

const dummyBook: IBook = {
  id: 1,
  category_id: '1',
  title: '책 제목',
  author: '저자',
  summary: '책 요약',
  likes: 1,
  price: 10000,
  img_path: 'https://via.placeholder.com/150',
}

function BooksList() {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  )
}
const BooksListStyle = styled.div`
  width: 100%;
  height: 100%;
`

export default BooksList
