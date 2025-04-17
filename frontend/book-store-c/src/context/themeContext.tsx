import { createContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../style/global'
import { getTheme, ThemeName } from '../style/theme'

const DEFAULT_THEME_NAME = 'light'
const THEME_LOCAL_STORAGE_KEY = 'book-store-theme'
interface IState {
  themeName: ThemeName
  toggleTheme: () => void
}

export const state: IState = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {},
}

export const ThemeContext = createContext<IState>(state)

export const BookStoreThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME)

  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light')
    localStorage.setItem(
      THEME_LOCAL_STORAGE_KEY,
      themeName === 'light' ? 'dark' : 'light',
    )
  }

  useEffect(() => {
    const savedThemeName = localStorage.getItem(
      THEME_LOCAL_STORAGE_KEY,
    ) as ThemeName
    setThemeName(savedThemeName || DEFAULT_THEME_NAME)
  }, [])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
