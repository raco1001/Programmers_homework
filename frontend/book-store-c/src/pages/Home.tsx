import MainReview from '@/components/home/MainReview'
import styled from 'styled-components'
import Title from '../components/common/Title'
import { useMain } from '../hooks/useMain'
function Home() {
  const { reviews, isLoading, error } = useMain()
  return (
    <HomeStyle>
      <Title size="large">제목 테스트</Title>
      {/* 배너 */}
      {/* 베스트 셀러 */}
      {/* 신간 */}
      {/* 리뷰 */}
      <MainReview reviews={reviews} />
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default Home
