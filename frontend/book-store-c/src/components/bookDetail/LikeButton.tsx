import { useEventLogger } from '@/hooks/useEventLogger'
import { FaHeart } from 'react-icons/fa'
import styled from 'styled-components'
import { IBookDetail } from '../../models/book.model'
import Button from '../common/Button'

interface LikeButtonProps {
  bookDetail: IBookDetail
  onClick: () => void
}

function LikeButton({ bookDetail, onClick }: LikeButtonProps) {
  const logEvent = useEventLogger()
  return (
    <LikeButtonStyle
      size="medium"
      schema={bookDetail.isLiked ? 'like' : 'normal'}
      onClick={() => {
        logEvent('like_click', { bookId: bookDetail.id })
        onClick()
      }}
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
