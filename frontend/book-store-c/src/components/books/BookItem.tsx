import { FaHeart } from 'react-icons/fa'
import { styled } from 'styled-components'
import { IBook } from '../../models/book.model'
import { Theme } from '../../style/theme'
import { formatNumber } from '../../utils/format'
import { ViewMode } from './BooksViewSwitcher'
import { Link } from 'react-router-dom'

interface IBookItemsProps {
  book: IBook
  view: ViewMode
}

function BookItem({ book, view }: IBookItemsProps) {
  if (book.title.length > 18) {
    book.title = book.title.slice(0, 18) + '...'
  }
  if (book.summary.length > 20) {
    book.summary = book.summary.slice(0, 20) + '...'
  }

  return (
    <BookItemStyle view={view}>
      <Link to={`/books/${book.id}`}>
        <div className="img">
          <img src={book.img_path} alt={book.title} />
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
      </Link>
    </BookItemStyle>
  )
}

const BookItemStyle = styled.div<
  Pick<IBookItemsProps, 'view'> & { theme: Theme }
>`
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }
  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    width: ${({ view }) => (view === 'grid' ? 'auto%' : '160px')};
    img {
      max-width: 100%;
    }
  }
  .content {
    position: relative;
    padding: 8px;
    flex: ${({ view }) => (view === 'grid' ? '0' : '1')};
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
      height: 32px;
    }

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default BookItem
