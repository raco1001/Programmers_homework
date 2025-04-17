import 'sanitize.css'
import { createGlobalStyle } from 'styled-components'
import { ThemeName } from './theme'
interface Props {
  themeName: ThemeName
}

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    background-color: ${({ themeName }) =>
      themeName === 'light' ? 'white' : 'black'};
    padding: 0;
    margin: 0;
  }
  
  h1 {
    padding: 0;
    margin: 0;
  }

  * {
    color: ${({ themeName }) => (themeName === 'light' ? 'black' : 'white')};
  }
`
