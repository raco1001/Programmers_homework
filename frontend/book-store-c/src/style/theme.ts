export type ThemeName = 'light' | 'dark'
type ColorKey = 'primary' | 'secondary' | 'tertiary' | 'background'

export interface Theme {
  name: ThemeName
  colors: Record<ColorKey, string>
}

export const light: Theme = {
  name: 'light',
  colors: {
    primary: 'brown',
    background: 'lightgray',
    secondary: 'blue',
    tertiary: 'green',
  },
}

export const dark: Theme = {
  name: 'dark',
  colors: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'darkblue',
    tertiary: 'darkgreen',
  },
}

export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'light':
      return light
    case 'dark':
      return dark
  }
}
