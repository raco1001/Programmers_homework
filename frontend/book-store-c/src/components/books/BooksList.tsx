import { styled } from 'styled-components'
import { IBook } from '../../models/book.model'
import BookItem from './BookItem'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { QUERY_STRING } from '../../constants/querystring'
import { ViewMode } from './BooksViewSwitcher'
interface IBooksListProps {
  books: IBook[]
}

function BooksList({ books }: IBooksListProps) {
  const [view, setView] = useState<ViewMode>('grid')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get(QUERY_STRING.VIEW) as ViewMode) {
      setView(params.get(QUERY_STRING.VIEW) as ViewMode)
    }
  }, [location.search])

  return (
    <BooksListStyle view={view}>
      {books?.map((book) => <BookItem key={book.id} book={book} view={view} />)}
    </BooksListStyle>
  )
}

interface BooksListStyleProps {
  view: ViewMode
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'};
  gap: 24px;
`

export default BooksList
