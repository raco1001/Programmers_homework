import { useContext } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import styled from 'styled-components'
import { ThemeContext } from '../../context/themeContext'
import { Theme } from '../../style/theme'

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext)

  return (
    <ThemeSwitcherStyle>
      <ul onClick={toggleTheme}>
        <li>
          {themeName === 'light' ? <FaSun /> : <FaMoon />}
          {themeName === 'light' ? 'Light' : 'Dark'}
        </li>
      </ul>
    </ThemeSwitcherStyle>
  )
}

const ThemeSwitcherStyle = styled.ul<{ theme: Theme }>`
  ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 120px;
      li {
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
`

export default ThemeSwitcher
