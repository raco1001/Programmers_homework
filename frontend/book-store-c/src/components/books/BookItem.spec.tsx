import { render } from '@testing-library/react'
import { BookStoreThemeProvider } from '../../context/themeContext'
import { IBook } from '../../models/book.model'
import { formatNumber } from '../../utils/format'
import BookItem from './BookItem'

const dummyBook: IBook = {
  id: 1,
  category_id: '1',
  title: '책 제목',
  author: '저자',
  summary: '책 요약',
  likes: 1,
  price: 10000,
  img_path: 'https://picsum.photos/id/1/600/600',
}

describe('BookItem', () => {
  it('랜더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>,
    )

    expect(getByText(dummyBook.title)).toBeInTheDocument()
    expect(getByText(dummyBook.summary)).toBeInTheDocument()
    expect(getByText(dummyBook.author)).toBeInTheDocument()
    expect(getByText(`${formatNumber(dummyBook.price)}원`)).toBeInTheDocument()
    expect(getByText(dummyBook.likes.toString())).toBeInTheDocument()
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      dummyBook.img_path,
    )
  })
})
