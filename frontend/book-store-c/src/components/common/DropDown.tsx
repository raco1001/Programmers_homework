import { Theme } from '@/style/theme'
import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
interface IDropDownProps {
  children: React.ReactNode
  toggleButton: React.ReactNode
  isOpen?: boolean
}

function DropDown({ children, toggleButton, isOpen = false }: IDropDownProps) {
  const [open, setOpen] = useState(isOpen)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <DropDownStyle $open={open} ref={dropdownRef}>
      <button className="toggle-button" onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {open && <div className="panel">{children}</div>}
    </DropDownStyle>
  )
}

interface IDropDownStyleProps {
  $open: boolean
  theme: Theme
}

const DropDownStyle = styled.div<IDropDownStyleProps>`
  position: relative;

  .toggle-button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: ${({ theme, $open }) =>
    $open ? theme.colors.primary : theme.colors.text};
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 100;
  }
`

export default DropDown
