import Button from '@/components/common/Button'
import InputText from '@/components/common/InputText'
import { useBookDetail } from '@/hooks/useBookDetails'
import { IBookDetail } from '@/models/book.model'
import { Theme } from '@/style/theme'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
interface AddToCartProps {
  bookDetail: IBookDetail
}

function AddToCart({ bookDetail }: AddToCartProps) {

  const [quantity, setQuantity] = useState<number>(1)
  const { handleAddToCart, cartAdded } = useBookDetail(bookDetail.id)
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    setQuantity(quantity - 1)
  }

  return (
    <AddToCartStyle $cartAdded={cartAdded}>
      <div className="input-box">
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <Button size="medium" schema="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" schema="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        schema="primary"
        onClick={() => {
          handleAddToCart(quantity)
        }}
      >
        장바구니 담기
      </Button>
      <div className="added-products">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  )
}

interface AddToCartStyleProps {
  $cartAdded: boolean
}

const AddToCartStyle = styled.div<AddToCartStyleProps & { theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input-box {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  position: relative;
  .added-products {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $cartAdded }) => ($cartAdded ? 1 : 0)};
    transition: all 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`

export default AddToCart
