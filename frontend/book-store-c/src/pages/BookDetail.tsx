import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import useBookDetail from '../hooks/useBookDetails'
function BookDetail() {
  const { bookId } = useParams()
  const { book } = useBookDetail(bookId)
  if (!book) return <div>Loading...</div>
  return <BookDetailStyle>BookDetail {book.title}</BookDetailStyle>
}

const BookDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export default BookDetail
