import styled from 'styled-components'
import { IBookDetail } from '../../models/book.model'
import Button from '../common/Button'
import { FaHeart } from 'react-icons/fa'
interface LikeButtonProps {
  bookDetail: IBookDetail
  onClick: () => void
}

function LikeButton({ bookDetail, onClick }: LikeButtonProps) {
  return (
    <LikeButtonStyle
      size="medium"
      schema={bookDetail.isLiked ? 'like' : 'normal'}
      onClick={onClick}
    >
      <FaHeart />
      {bookDetail.likes}
    </LikeButtonStyle>
  )
}

const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`

export default LikeButton
