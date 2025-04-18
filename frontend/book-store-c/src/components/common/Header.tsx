import { FaRegUser, FaSignInAlt } from 'react-icons/fa'
import { styled } from 'styled-components'
import logo from '../../assets/images/bookstoreLogo-removebg-preview.png'
import { Theme } from '../../style/theme'
import ThemeSwitcher from '../header/ThemeSwitcher'
const CATEGORY = [
  { id: 0, name: '동화' },
  { id: 1, name: '소설' },
  { id: 2, name: '사회' },
]

function Header() {
  return (
    <HeaderStyle>
      <h1 className="logo">
        <img src={logo} alt="logo" />
      </h1>
      <ThemeSwitcher />
      <nav>
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <a href={item.id ? `/books?category_id=${item.id}` : '/books'}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <a href="/login">
              <FaSignInAlt />
              로그인
            </a>
            <a href="/signup">
              <FaRegUser />
              로그아웃
            </a>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header<{ theme: Theme }>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  .logo {
    width: 100px;
    img {
      width: 200px;
    }
  }
  .category {
    ul {
      display: flex;
      gap: 32px;
      a {
        font-size: 1.5rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
  .auth {
    ul {
      display: flex;
      gap: 16px;
      a {
        font-size: 1rem;
        font-weght: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        line-height: 1;
        svg {
          margin-right: 6px;
        }
      }
    }
  }
`

export default Header
