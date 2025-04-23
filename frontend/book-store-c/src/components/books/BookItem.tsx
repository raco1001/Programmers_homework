import { FaHeart } from 'react-icons/fa'
import { styled } from 'styled-components'
import { IBook } from '../../models/book.model'
import { Theme } from '../../style/theme'
import { formatNumber } from '../../utils/format'
import { getImgSrc } from '../../utils/images'

interface IBookItemsProps {
  book: IBook
}

function BookItem({ book }: IBookItemsProps) {
  return (
    <BookItemStyle>
      <div className="img">
        <img src={getImgSrc(book.id)} alt={book.title} />
      </div>
      <div className="content">
        <h2>{book.title}</h2>
        <p>{book.summary}</p>
        <p>{book.author}</p>
        <p>{formatNumber(book.price)}원</p>

        <div className="likes">
          <FaHeart />
          <p>{book.likes}</p>
        </div>
      </div>
    </BookItemStyle>
  )
}

const BookItemStyle = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  .img {
    max-width: 100%;
  }

  .content {
    position: relative;
    h2 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    .summary {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.secondary};
    }

    .author {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0 0 4px 0;
    }

    .price {
      font-size: 1.25rem;
      color: ${({ theme }) => theme.colors.secondary};
      margin: 0 0 4px 0;
      font-weight: 700;
    }

    .likes {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.primary};
      margin: 0 0 4px 0;
      font-weight: 700;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 4px;
      padding: 4px 12px;
      position: absolute;
      bottom: 16px;
      right: 16px;
    }

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default BookItem
