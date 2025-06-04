import useMediaQuery from '@/hooks/useMediaQuery'
import { useState } from 'react'
import {
  FaAngleRight,
  FaBars,
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
import { getTheme, Theme } from '../../style/theme'
import ThemeSwitcher from '../header/ThemeSwitcher'
import DropDown from './DropDown'

function Header() {
  const { category } = useCategory()
  const { isLoggedIn, storeLogout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile } = useMediaQuery(getTheme("light"))

  console.log(isMobile)
  return (
    <HeaderStyle $isOpen={isMenuOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="BOOKSTORE" />
        </Link>
      </h1>
      <nav className="category">
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaAngleRight /> : <FaBars />}
        </button>
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
    </HeaderStyle>
  )
}


interface HeaderStyleProps {
  theme: Theme
  $isOpen: boolean
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  padding: 0 20px;


      margin: 0 auto;
      max-width: ${({ theme }) => theme.layout.width.large};
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;

      
    .logo {
      img {
        width: 200px;
        height: auto;
      }
    }

    .category {
      flex: 1;
      display: flex;
      justify-content: center;
      .menu-button {
        display: none;
      }
      
      ul {
        display: flex;
        gap: 32px;

        li {
          a {
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
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 24px;

      .auth {
        ul {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 120px;

          li {
            a,
            button {
              font-size: 1.5rem;
              font-weight: 600;
              text-decoration: none;

              &:hover {
                color: ${({ theme }) => theme.colors.primary};
              }
            }
          }
        }
      }
    }
  


  @media ${({ theme }) => theme.mediaQuery.mobile} {

      height: 52px;
      position: relative;

      .logo {
        padding: 0 0 0 12px;

        img {
          width: 25%;
          height: auto;
        }
      }

      .right-section {
        position: absolute;
        top: 12px;
        right: 12px;
        display: flex;
        align-items: center;
        gap: 16px; /* 기존: 12px → 살짝 넓힘 */
        z-index: 1001;

        .auth {
          position: relative;
          top: 0;
          right: 0;
          font-size: 1.5rem;
        }
      }

      .category {
        .menu-button {
          display: block;
          font-size: 1.8rem;
          background: none;
          border: none;
          cursor: pointer;
          right: ${({ $isOpen }) => $isOpen ? '62px' : '54x'};
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100vh;
          background: ${({ theme }) => theme.colors.background};
          padding: 1rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease-in-out;
          transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
          z-index: 1000;
        }
      }
    }
  


`

export default Header
