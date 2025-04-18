import { render, screen } from '@testing-library/react'
import React from 'react'
import { BookStoreThemeProvider } from '../../context/themeContext'
import InputText from './InputText'

describe('InputText 컴포넌트 테스트', () => {
  it('렌더를 확인합니다.', () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" />
      </BookStoreThemeProvider>,
    )
    expect(screen.getByPlaceholderText('여기에 입력하세요')).toBeInTheDocument()
  })
  it('forwardRef 테스트.', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" ref={ref} />
      </BookStoreThemeProvider>,
    )
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
