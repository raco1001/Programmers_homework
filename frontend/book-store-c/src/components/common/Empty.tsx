import { FaSmileWink } from 'react-icons/fa'
import styled from 'styled-components'
import { Theme } from '../../style/theme'
import Title from '../common/Title'

interface EmptyProps {
  icon?: React.ReactNode
  title: string
  description: React.ReactNode
}

function Empty({ icon, title, description }: EmptyProps) {
  return (
    <EmptyStyle>
      {icon && <div className="icon">{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <div className="description">{description}</div>}
    </EmptyStyle>
  )
}

const EmptyStyle = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`
export default Empty
