import { styled } from 'styled-components'
import { ColorKey, HeadingSize, Theme } from '../../style/theme'
interface TitleProps {
  children: React.ReactNode
  size: HeadingSize
  color?: ColorKey
}

const Title = ({ children, size, color }: TitleProps) => {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  )
}

const TitleStyle = styled.h1<
  Omit<TitleProps, 'children'> & {
    theme: Theme
  }
>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.primary};
`

export default Title
