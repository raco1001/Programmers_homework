import { styled } from 'styled-components'
import Button from '../common/Button'
import { FaList, FaTh } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import { QUERY_STRING } from '../../constants/querystring'
import { useEffect } from 'react'
const viewOptions = [
  {
    value: 'grid',
    icon: <FaTh />,
  },
  {
    value: 'list',
    icon: <FaList />,
  },
]

export type ViewMode = 'grid' | 'list'

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSwitchView = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(QUERY_STRING.VIEW, value)
    setSearchParams(newSearchParams)
  }
  useEffect(() => {
    if (!searchParams.get(QUERY_STRING.VIEW)) {
      handleSwitchView('grid')
    }
  }, [searchParams])
  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          size="small"
          schema={
            searchParams.get(QUERY_STRING.VIEW) === option.value
              ? 'primary'
              : 'normal'
          }
          onClick={() => handleSwitchView(option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  )
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  ggap: 8px;
  svg {
    fill: #fff;
  }
`

export default BooksViewSwitcher
