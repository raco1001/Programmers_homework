import {
  FaRegUser,
  FaShoppingBag,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import logo from '../../assets/images/bookstoreLogo-removebg-preview.png'
import { useCategory } from '../../hooks/useCategory'
import { useAuthStore } from '../../store/authStore'
import { Theme } from '../../style/theme'
import ThemeSwitcher from '../header/ThemeSwitcher'
import DropDown from './DropDown'
function Header() {
  const { category } = useCategory()
  const { isLoggedIn, storeLogout } = useAuthStore()

  return (
    <HeaderStyle>
      <div className="header-content">
        <h1 className="logo">
          <Link to="/">
            <img src={logo} alt="BOOKSTORE" />
          </Link>
        </h1>

        <nav className="category">
          <ul>
            {category.map((item) => (
              <li key={item.id}>
                <Link to={`/books?category=${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="right-section">
          <nav className="auth">
            <DropDown toggleButton={<FaUserCircle />}>
              {isLoggedIn && (
                <ul>
                  <li>
                    <Link to="/cart">
                      <FaShoppingCart />
                      장바구니
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderlist">
                      <FaShoppingBag />
                      주문내역
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={storeLogout}>
                      <FaSignOutAlt />
                      로그아웃
                    </Link>
                  </li>
                </ul>
              )}
              {!isLoggedIn && (
                <ul>
                  <li>
                    <Link to="/login">
                      <FaSignInAlt />
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <FaRegUser />
                      회원가입
                    </Link>
                  </li>
                </ul>
              )}
              <ThemeSwitcher />
            </DropDown>
          </nav>
        </div>
      </div>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header<{ theme: Theme }>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  padding: 0 20px;

  .header-content {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }

  .logo {
    width: 200px;
    img {
      width: 100%;
      height: auto;
    }
  }

  .category {
    flex: 1;
    display: flex;
    justify-content: center;

    ul {
      display: flex;
      gap: 48px;

      li a {
        font-size: 1.1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        text-decoration: none;

        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 120px;
      li {
        a,
        button {
          font-size: 1 rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
          background-color: none;
          border: 0;
          cursor: pointer;
          gap: 6px;
          color: ${({ theme }) => theme.colors.text};
          justify-content: center;
          width: 100%;

          svg {
            margin-right: 6px;
          }

          &:hover {
            color: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }
`

export default Header
