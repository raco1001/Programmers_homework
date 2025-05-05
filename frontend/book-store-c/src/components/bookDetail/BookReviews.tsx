import AddBookReview from '@/components/bookDetail/AddBookReview'
import BookReviewItem from '@/components/bookDetail/BookReviewItem'
import { BookReviewItemWrite, IBookReviewItem } from '@/models/book.model'
import { styled } from 'styled-components'

interface IBookReviewsProps {
  reviews: IBookReviewItem[]
  onAddReview: (data: BookReviewItemWrite) => void
}

function BookReviews({ reviews, onAddReview }: IBookReviewsProps) {
  return (
    <>
      <BookReviewsStyle>
        <AddBookReview onAddReview={onAddReview} />
        {reviews.map((review) => (
          <BookReviewItem key={review.reviewId} review={review} />
        ))}
      </BookReviewsStyle>
    </>
  )
}

const BookReviewsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default BookReviews
