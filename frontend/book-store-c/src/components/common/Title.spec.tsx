import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { getTheme } from '../../style/theme'
import Title from './Title'

describe('Title 컴포넌트 테스트', () => {
  it('렌더를 확인합니다.', () => {
    render(
      <ThemeProvider theme={getTheme('light')}>
        <Title size="large">제목</Title>
      </ThemeProvider>,
    )
    expect(screen.getByText('제목')).toBeInTheDocument()
  })
  it('Size Props 적용 테스트.', () => {
    const { container } = render(
      <ThemeProvider theme={getTheme('light')}>
        <Title size="large">제목</Title>
      </ThemeProvider>,
    )
    expect(container?.firstChild).toHaveStyle('font-size: 2rem')
  })
  it('Color Props 적용 테스트.', () => {
    const { container } = render(
      <ThemeProvider theme={getTheme('light')}>
        <Title size="medium">제목</Title>
      </ThemeProvider>,
    )
    expect(container?.firstChild).toHaveStyle('color: brown')
  })
})
