import { styled } from 'styled-components'
import { Theme } from '../../style/theme'

function Header() {
  return (
    <HeaderStyle>
      <h1>Book Store</h1>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.background};

  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export default Header
