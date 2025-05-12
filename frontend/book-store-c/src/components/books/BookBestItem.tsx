import { IBook } from '@/models/book.model'
import { Theme } from '@/style/theme'
import { styled } from 'styled-components'
import BookItem, { BookItemStyle } from './BookItem'


interface IBookBestItemProps {
  book: IBook
  itemIndex: number
}


function BookBestItem({ book, itemIndex }: IBookBestItemProps) {


  return (
    <>
      <BookBestItemStyle>
        <BookItem book={book} view="grid" />
        <div className="rank">{itemIndex + 1}</div>
      </BookBestItemStyle>
    </>
  )
}

const BookBestItemStyle = styled.div<{ theme: Theme }>`
${BookItemStyle} {
  .summary,
  .price,
  .likes {
    display: none;
  }
  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

  position: relative;

.rank {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  font-style: italic;
}
`

export default BookBestItem
