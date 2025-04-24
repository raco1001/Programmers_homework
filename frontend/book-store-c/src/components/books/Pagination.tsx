import { styled } from 'styled-components'
import { IPagination } from '../../models/pagination.model'
import { LIMIT } from '../../constants/pagination'
import Button from '../common/Button'
import { useSearchParams } from 'react-router-dom'
import { QUERY_STRING } from '../../constants/querystring'
interface IPaginationProps {
  pagination: IPagination
}

function Pagination({ pagination }: IPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { currentPage, totalCount } = pagination
  const pages: number = Math.ceil(totalCount / LIMIT)
  const handleClickPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(QUERY_STRING.PAGE, page.toString())
    setSearchParams(newParams)
  }
  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Button
                  key={index}
                  size="small"
                  schema={currentPage === index + 1 ? 'primary' : 'normal'}
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  )
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px 0;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`

export default Pagination
