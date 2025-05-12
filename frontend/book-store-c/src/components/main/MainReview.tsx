import { IBookReviewItem } from '@/models/book.model'
import { Theme } from '@/style/theme'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { styled } from 'styled-components'
import BookReviewItem from '../bookDetail/BookReviewItem'

interface MainReviewProps {
  reviews: IBookReviewItem[]
}

function MainReview({ reviews }: MainReviewProps) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 16,
  }

  return (
    <MainReviewStyle>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <div className="review-item" key={review.reviewId}>
            <BookReviewItem review={review} />
          </div>
        ))}
      </Slider>
    </MainReviewStyle>
  )
}

const MainReviewStyle = styled.div<{ theme: Theme }>`
  padding: 0 0 24px 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 0 !important;

  h2 {
    margin-top: 0;
    padding-top: 0;
  }

  .slick-slider, .slick-list, .slick-track {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .review-item {
    min-width: 250px;
    max-width: 400px;
    width: 100%;
    height: 100%;
    padding: 0 12px;
  }

  .slick-list, .slick-track {
    min-height: 320px;
    width: 100%;
  }
    

  .slick-track {
    padding: 12px 0;
  }

  
`



export default MainReview
