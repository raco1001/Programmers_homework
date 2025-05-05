export type ThemeName = 'light' | 'dark'
export type ColorKey =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'background'
  | 'border'
  | 'text'

export type HeadingSize = 'large' | 'medium' | 'small'
export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonSchema = 'primary' | 'normal' | 'like'
export type BorderRadius = 'default'
export type LayoutWidth = 'large' | 'medium' | 'small'
export interface Theme {
  name: ThemeName
  colors: Record<ColorKey, string>
  heading: {
    [key in HeadingSize]: {
      fontSize: string
    }
  }
  button: {
    [key in ButtonSize]: {
      fontSize: string
      padding: string
    }
  }
  buttonSchema: {
    [key in ButtonSchema]: {
      color: string
      backgroundColor: string
    }
  }
  borderRadius: {
    default: string
  }
  layout: {
    width: {
      [key in LayoutWidth]: string
    }
  }
}

export const light: Theme = {
  name: 'light',
  colors: {
    primary: '#3b72f2',
    background: '#e9eaed',
    secondary: 'blue',
    tertiary: 'green',
    border: 'gray',
    text: 'black',
  },
  heading: {
    large: {
      fontSize: '2rem',
    },
    medium: {
      fontSize: '1.5rem',
    },
    small: {
      fontSize: '1rem',
    },
  },
  button: {
    large: {
      fontSize: '1.5rem',
      padding: '1rem 2rem',
    },
    medium: {
      fontSize: '1rem',
      padding: '0.5rem 1rem',
    },
    small: {
      fontSize: '0.75rem',
      padding: '0.25rem 0.5rem',
    },
  },
  buttonSchema: {
    primary: {
      color: 'white',
      backgroundColor: 'midnightblue',
    },
    normal: {
      color: 'black',
      backgroundColor: 'lightgray',
    },
    like: {
      color: 'white',
      backgroundColor: 'coral',
    },
  },
  borderRadius: {
    default: '4px',
  },
  layout: {
    width: {
      large: '1020px',
      medium: '760px',
      small: '320px',
    },
  },
}

export const dark: Theme = {
  ...light,
  name: 'dark',
  colors: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'darkblue',
    tertiary: 'darkgreen',
    border: 'gray',
    text: 'white',
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
