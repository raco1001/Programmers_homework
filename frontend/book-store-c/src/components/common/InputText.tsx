import React, { ForwardedRef } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import { Theme } from '../../style/theme'
interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  inputType?: 'text' | 'email' | 'password' | 'number'
  register?: UseFormRegister<FieldValues>
}

const InputText = React.forwardRef(
  (
    {
      placeholder,
      inputType = 'text',
      onChange,
      register,
      ...props
    }: InputTextProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <InputTextStyle
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        onChange={onChange}
        {...props}
      />
    )
  },
)

const InputTextStyle = styled.input<{ theme: Theme }>`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
`

export default InputText
