import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import styled from 'styled-components'
import Button from './Button'
interface EllipsisBoxProps {
  children: React.ReactNode
  linelimit: number
}

function EllipsisBox({ children, linelimit }: EllipsisBoxProps) {
  const [expanded, setExpanded] = useState(false)
  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          onClick={() => setExpanded(!expanded)}
          size="small"
          schema="normal"
        >
          {expanded ? '접기' : '펼치기'}
          <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  )
}

interface EllipsisBoxStyleProps {
  linelimit: number
  $expanded: boolean
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
    $expanded ? 'none' : linelimit};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
  }
  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ $expanded }) => ($expanded ? 'rotate(180deg)' : 'none')};
    }
  }
`

export default EllipsisBox
