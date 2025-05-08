import { IBookReviewItem } from '@/models/book.model'
import { styled } from 'styled-components'
import BookReviewItem from '../bookDetail/BookReviewItem'
interface MainReviewProps {
  reviews: IBookReviewItem[]
}

function MainReview({ reviews }: MainReviewProps) {
  return (
    <>
      <MainReviewStyle>
        {reviews.map((review) => (
          <BookReviewItem key={review.reviewId} review={review} />
        ))}
      </MainReviewStyle>
    </>
  )
}

const MainReviewStyle = styled.div``

export default MainReview
