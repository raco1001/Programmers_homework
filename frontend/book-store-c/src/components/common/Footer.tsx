import { styled } from 'styled-components'
import logo from '../../assets/images/bookstoreLogo-removebg-preview.png'
import { Theme } from '../../style/theme'
function Footer() {
  return (
    <FooterStyle>
      <h1 className="logo">
        <img src={logo} alt="book store" />
      </h1>
      <div>
        <p>copy right 2025 Book Store</p>
      </div>
    </FooterStyle>
  )
}

const FooterStyle = styled.footer<{ theme: Theme }>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  .logo {
    img {
      width: 140px;
    }
  }
  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export default Footer
