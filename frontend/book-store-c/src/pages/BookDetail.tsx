import AddToCart from '@/components/bookDetail/AddToCart'
import BookReviews from '@/components/bookDetail/BookReviews'
import LikeButton from '@/components/bookDetail/LikeButton'
import EllipsisBox from '@/components/common/EllipsisBox'
import Modal from '@/components/common/Modal'
import { Tab, Tabs } from '@/components/common/Tabs'
import Title from '@/components/common/Title'
import useBookDetail from '@/hooks/useBookDetails'
import { useEventLogger } from '@/hooks/useEventLogger'
import { IBookDetail } from '@/models/book.model'
import { Theme } from '@/style/theme'
import { formatDate, formatNumber } from '@/utils/format'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
const bookInfoList = [
  {
    label: '카테고리',
    key: 'categoryPath',
    filter: (book: IBookDetail) => {
      return (
        <Link to={`/books?category_id=${book.category_id}`}>
          {Array.isArray(book.categoryPath) && book.categoryPath.length > 0
            ? book.categoryPath.join(' > ')
            : '카테고리 없음'}
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
  const { bookDetail, likeToggle, reviews, addBookReview } = useBookDetail(bookId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const logEvent = useEventLogger()
  logEvent('book_detail_view', { bookId: bookId })
  if (!bookDetail) return null

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => setIsModalOpen(true)}>
          <img src={bookDetail.img_path} alt={bookDetail.title} />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img src={bookDetail.img_path} alt={bookDetail.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {bookDetail.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(bookDetail)
                  : bookDetail[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{bookDetail.summary}</p>
          <div className="likes">
            <LikeButton bookDetail={bookDetail} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart bookDetail={bookDetail} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox linelimit={2}>{bookDetail.description}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <EllipsisBox linelimit={2}>{bookDetail.table_of_contents}</EllipsisBox>
          </Tab>
          <Tab title="리뷰">
            <BookReviews reviews={reviews} onAddReview={addBookReview} />
          </Tab>
        </Tabs>
      </div>
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
  .content {
    white-space: pre-line;
  }
`

export default BookDetail
