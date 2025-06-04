import Banner from '@/components/common/banner/Banner'
import Title from '@/components/common/Title'
import MainBest from '@/components/main/MainBest'
import MainNewBooks from '@/components/main/MainNewBooks'
import MainReview from '@/components/main/MainReview'
import { getTheme } from '@/style/theme'
import styled from 'styled-components'
import { useMain } from '../hooks/useMain'
import { useMediaQuery } from '../hooks/useMediaQuery'

function Home() {
  const { reviews, newBooks, bestBooks, banners } = useMain()
  const { isMobile } = useMediaQuery(getTheme("light"))
  console.log(isMobile)
  return (
    <HomeStyle>
      {/* 배너 */}
      <section className='section'>
        {isMobile ? <Banner banners={banners} /> : <Banner banners={banners} />}
      </section>
      {/* 베스트 셀러 */}
      <section className='section'>
        <Title size='large'>베스트 셀러</Title>
        <MainBest books={bestBooks} />
      </section>
      {/* 신간 */}
      <section className='section'>
        <Title size='large'>신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>
      {/* 리뷰 */}
      <section className='section'>
        <Title size='large'>리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`

export default Home
