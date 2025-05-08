import { useEventLogger } from '@/hooks/useEventLogger'
import { useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { QUERY_STRING } from '../../constants/querystring'
import { useCategory } from '../../hooks/useCategory'
import Button from '../common/Button'


function BooksFilter() {
  const { category } = useCategory()
  const [searchParams, setSearchParams] = useSearchParams()
  const logEvent = useEventLogger()
  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (id === null) {
      newSearchParams.delete(QUERY_STRING.CATEGORY_ID)
    } else {
      newSearchParams.set(QUERY_STRING.CATEGORY_ID, id.toString())
    }
    setSearchParams(newSearchParams)
    logEvent('category_click', { categoryId: id })
    console.log('Event logged:', {
      eventName: 'category_click',
      payload: { categoryId: id },
      endpoint: process.env.REACT_APP_MONITORING_ENDPOINT,
      isEnabled: process.env.REACT_APP_ENABLE_MONITORING === 'true'
    })
  }

  const handleNews = () => {
    const newsSearchParams = new URLSearchParams(searchParams)
    if (newsSearchParams.get(QUERY_STRING.NEWS)) {
      newsSearchParams.delete(QUERY_STRING.NEWS)
    } else {
      newsSearchParams.set(QUERY_STRING.NEWS, 'true')
    }
    setSearchParams(newsSearchParams)
    logEvent('news_click', { isNews: newsSearchParams.get(QUERY_STRING.NEWS) === 'true' })
    console.log('Event logged:', {
      eventName: 'news_click',
      payload: { isNews: newsSearchParams.get(QUERY_STRING.NEWS) === 'true' },
      endpoint: process.env.REACT_APP_MONITORING_ENDPOINT,
      isEnabled: process.env.REACT_APP_ENABLE_MONITORING === 'true'
    })
  }

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            key={item.id}
            size="medium"
            schema={item.isActive ? 'primary' : 'normal'}
            onClick={() => handleCategory(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          schema={searchParams.get(QUERY_STRING.NEWS) ? 'primary' : 'normal'}
          onClick={() => handleNews()}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  )
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`

export default BooksFilter
