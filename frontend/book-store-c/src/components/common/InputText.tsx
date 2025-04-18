import React, { ForwardedRef } from 'react'
import styled from 'styled-components'
import { Theme } from '../../style/theme'

interface InputTextProps {
  placeholder?: string
}

const InputText = React.forwardRef(
  (props: InputTextProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputTextStyle placeholder={props.placeholder} ref={ref} />
  },
)

const InputTextStyle = styled.input.attrs({ type: 'text' })<{ theme: Theme }>`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
`

export default InputText
