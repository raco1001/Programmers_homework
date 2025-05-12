import { IBook } from '@/models/book.model';
import { styled } from 'styled-components';
import BookBestItem from '../books/BookBestItem';

interface MainBooksProps {
  books: IBook[]
}

function MainBest({ books }: MainBooksProps) {
  if (!books) return null;

  return (
    <>
      <MainBestStyle>
        {
          books.map((book, index) => (
            <BookBestItem key={book.id} book={book} itemIndex={index} />
          ))
        }
      </MainBestStyle>
    </>
  )
}

const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 24px 0;
`

export default MainBest
