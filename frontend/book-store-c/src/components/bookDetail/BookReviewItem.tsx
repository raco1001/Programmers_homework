import { IBookReviewItem } from '@/models/book.model'
import { Theme } from '@/style/theme'
import { formatDate } from '@/utils/format'
import { FaStar } from 'react-icons/fa'
import { styled } from 'styled-components'
interface IBookReviewItemProps {
  review: IBookReviewItem
}

const Star = (props: Pick<IBookReviewItem, 'rating'>) => {
  return (
    <div>
      {Array.from({ length: props.rating }).map((_, index) => (
        <span key={index}><FaStar /></span>
      ))}
    </div>
  )
}


function BookReviewItem({ review }: IBookReviewItemProps) {
  return (
    <>
      <BookReviewItemStyle>
        <header className="header">
          <div>
            <span>{review.userName}</span>
            <span className="star"><Star rating={review.rating} /></span>
          </div>
          <div>{formatDate(review.createdAt)}</div>
        </header>

        <div className="content">
          <p>{review.review}</p>
        </div>
      </BookReviewItemStyle>
    </>
  )
}

const BookReviewItemStyle = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  min-height: 200px;
  border: 1px solid #ccc;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.secondary};
    padding: 0;
    
    .star {
      padding: 0 0 0 8px;
      svg {
        fill: ${({ theme }) => theme.colors.primary};
        width: 14px;
        height: 14px;
      }
    }
  }

  .content {
    flex: 1;
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
      color: ${({ theme }) => theme.colors.text};
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`




export default BookReviewItem
