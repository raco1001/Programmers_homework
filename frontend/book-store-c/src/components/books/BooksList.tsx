import { styled } from 'styled-components'
import { IBook } from '../../models/book.model'
import BookItem from './BookItem'
import { IPagenation } from '../../models/pagenation.model'

interface IBooksListProps {
  books: IBook[]
  pagenation: IPagenation
}

function BooksList({ books, pagenation }: IBooksListProps) {
  console.log('받은 데이터', books)
  return (
    <BooksListStyle>
      {books?.map((book) => <BookItem key={book.id} book={book} />)}
    </BooksListStyle>
  )
}
const BooksListStyle = styled.div`
  width: 100%;
  height: 100%;
`

export default BooksList
