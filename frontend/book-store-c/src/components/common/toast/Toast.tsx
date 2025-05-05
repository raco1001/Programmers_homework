import useTimeout from '@/hooks/useTimeout';
import useToastStore, { ToastItem } from '@/store/toastStore';
import { useState } from 'react';
import { FaBan, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { styled } from 'styled-components';
export const TOAST_DURATION = 3000;


function Toast({ id, message, type }: ToastItem) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useTimeout(() => {
    setIsFadingOut(true);
  }, TOAST_DURATION);

  const handleRemoveToast = () => {
    setTimeout(() => {
      removeToast(id);
    }, 300);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  return (
    <ToastStyle type={type} className={isFadingOut ? 'fade-out' : 'fade-in'} onAnimationEnd={handleAnimationEnd}>
      <p>
        {type === "info" && <FaInfoCircle />}
        {type === "error" && <FaBan />}
        {message}
      </p>
      <button onClick={handleRemoveToast}>
        <FaTimes />
      </button>
    </ToastStyle>
  );
}

const ToastStyle = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: ${({ type }) => type === "info" ? "rgba(59, 130, 246, 0.95)" : "rgba(239, 68, 68, 0.95)"};
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid ${({ type }) => type === "info" ? "rgba(59, 130, 246, 0.2)" : "rgba(239, 68, 68, 0.2)"};
  min-width: 280px;
  max-width: 400px;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    color: white;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

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
`;

export default Toast;
