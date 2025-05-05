import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaPlus } from 'react-icons/fa'
import { styled } from 'styled-components'
interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  const [isFadingOut, setIsFadingOut] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    if (!isFadingOut) {
      setIsFadingOut(true)
    }
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose()
    }
  }

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setIsFadingOut(false)
      onClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen && !isFadingOut) {
    return null
  }

  return createPortal(
    <ModalStyle
      onClick={handleClickOutside}
      className={isFadingOut ? 'fade-out' : 'fade-in'}
      onAnimationEnd={handleAnimationEnd}>
      <div className='modal-body' ref={modalRef}>
        <div className='modal-content'>{children}</div>
        <button className='modal-close' onClick={handleClose}>
          <FaPlus />
        </button>
      </div>
    </ModalStyle>,
    document.body
  )
}

const ModalStyle = styled.div`
    @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &.fade-in {
    animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  &.fade-out {
    animation: fade-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 54px 32px 32px;
  }

  .modal-close {
    background-color: transparent;
    border: none;
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;

    svg {
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
    }
  }
`

export default Modal
