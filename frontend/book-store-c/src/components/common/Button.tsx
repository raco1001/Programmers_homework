import React from 'react'
import { styled } from 'styled-components'
import { ButtonSchema, ButtonSize, Theme } from '../../style/theme'

interface ButtonProps {
  children: React.ReactNode
  size: ButtonSize
  schema: ButtonSchema
  disabled?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

function Button({
  children,
  schema,
  disabled,
  isLoading,
  size,
  ...props
}: ButtonProps) {
  return (
    <ButtonStyle
      schema={schema}
      disabled={disabled}
      isLoading={isLoading}
      size={size}
      {...props}
    >
      {children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button<
  Omit<ButtonProps, 'children'> & { theme: Theme }
>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  background-color: ${({ theme, schema }) =>
    theme.buttonSchema[schema].backgroundColor};
  color: ${({ theme, schema }) => theme.buttonSchema[schema].color};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};
`

export default Button
