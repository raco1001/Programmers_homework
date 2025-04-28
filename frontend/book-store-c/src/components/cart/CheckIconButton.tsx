import styled from 'styled-components'
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import { Theme } from '../../style/theme'
interface CheckIconButtonProps {
  isChecked: boolean
  onCheck: () => void
}

const CheckIconButton = ({ isChecked, onCheck }: CheckIconButtonProps) => {
  return (
    <CheckIconButtonStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckIconButtonStyle>
  )
}

const CheckIconButtonStyle = styled.button<{ theme: Theme }>`
  background: none;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`

export default CheckIconButton
