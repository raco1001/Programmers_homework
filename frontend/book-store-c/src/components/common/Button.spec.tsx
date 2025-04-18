import { render, screen } from '@testing-library/react'
import { BookStoreThemeProvider } from '../../context/themeContext'
import Button from './Button'

describe('Button 컴포넌트 테스트', () => {
  it('렌더를 확인합니다.', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" schema="primary">
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>,
    )
    expect(screen.getByText('버튼 테스트')).toBeInTheDocument()
  })
  it('Size Props 적용 테스트.', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" schema="primary">
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>,
    )
    expect(container?.firstChild).toHaveStyle('font-size: 1.5rem')
  })
  it('Color Props 적용 테스트.', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="medium" schema="primary">
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>,
    )
    expect(container?.firstChild).toHaveStyle('color: white')
  })
})
