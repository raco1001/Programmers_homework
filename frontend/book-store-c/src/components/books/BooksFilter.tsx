import { styled } from 'styled-components'
import { useCategory } from '../../hooks/useCategory'
import Button from '../common/Button'
import { useSearchParams } from 'react-router-dom'
import { QUERY_STRING } from '../../constants/querystring'
function BooksFilter() {
  const { category } = useCategory()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (id === null) {
      newSearchParams.delete(QUERY_STRING.CATEGORY_ID)
    } else {
      newSearchParams.set(QUERY_STRING.CATEGORY_ID, id.toString())
    }
    setSearchParams(newSearchParams)
  }

  const handleNews = () => {
    const newsSearchParams = new URLSearchParams(searchParams)
    if (newsSearchParams.get(QUERY_STRING.NEWS)) {
      newsSearchParams.delete(QUERY_STRING.NEWS)
    } else {
      newsSearchParams.set(QUERY_STRING.NEWS, 'true')
    }
    setSearchParams(newsSearchParams)
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
