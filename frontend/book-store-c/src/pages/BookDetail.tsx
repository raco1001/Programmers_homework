import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import useBookDetail from '../hooks/useBookDetails'
import Title from '../components/common/Title'
import { IBookDetail } from '../models/book.model'
import { formatNumber, formatDate } from '../utils/format'
import { Link } from 'react-router-dom'
import { Theme } from '../style/theme'
import { FaHeart } from 'react-icons/fa'
const bookInfoList = [
  {
    label: '카테고리',
    key: 'categoryPath',
    filter: (book: IBookDetail) => {
      return (
        <Link to={`/books?category_id=${book.category_id}`}>
          {book.categoryPath.join(' > ')}
        </Link>
      )
    },
  },
  {
    label: '포맷',
    key: 'format',
  },
  {
    label: '페이지',
    key: 'pages',
  },
  {
    label: '출간일',
    key: 'publication_date',
    filter: (book: IBookDetail) => {
      return formatDate(book.publication_date)
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`
    },
  },
]

function BookDetail() {
  const { bookId } = useParams()
  const { book } = useBookDetail(bookId)
  if (!book) return null

  const categoryName = book.categoryPath.reduce((acc, category) => {
    const arrow = acc ? ' > ' : ''
    return acc + `${arrow}${category}`
  }, '')
  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={book.img_path} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="likes">
            <FaHeart />
            <p>{book.likes}</p>
          </div>
          <div className="add-cart">
            <button>장바구니 추가</button>
          </div>
        </div>
      </header>
      <div className="content"></div>
    </BookDetailStyle>
  )
}

const BookDetailStyle = styled.div<{ theme: Theme }>`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      dl {
        display: flex;
        margin: 0;

        dt {
          width: 80px;
          color: ${({ theme }) => theme.colors.secondary};
        }
        a {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`

export default BookDetail
