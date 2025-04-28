import styled from 'styled-components'
import Title from '../common/Title'
import { ICart, ICartItem } from '../../models/cart.model'
import Button from '../common/Button'
import { formatNumber } from '../../utils/format'
import { Theme } from '../../style/theme'
import { useMemo } from 'react'
import CheckIconButton from './CheckIconButton'
import { useAlert } from '../../hooks/useAlert'
import { ICheckedItem } from '../../pages/Cart'
interface CartItemProps {
  cart: ICart
  checkedItems: ICheckedItem[]
  onCheck: (productId: string) => void
  onDelete: (productId: string) => void
}

function CartItem({ cart, checkedItems, onCheck, onDelete }: CartItemProps) {
  const { showConfirm } = useAlert()
  const isChecked = useMemo(() => {
    return checkedItems.some((item) => item.productId === cart.productId)
  }, [checkedItems, cart.productId])

  const handleCheck = () => {
    onCheck(cart.productId)
  }

  const handleDelete = () => {
    showConfirm(`${cart.title}을 삭제하시겠습니까?`, () => {
      onDelete(cart.productId)
    })
  }

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check-box">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>

        <div>
          <Title size="medium">{cart.title}</Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}원</p>
          <p className="quantity">{cart.quantity}권</p>
        </div>
      </div>
      <Button size="medium" schema="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  )
}

const CartItemStyle = styled.div<{ theme: Theme }>`
  display: flex;

  align-items: start;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .info {
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 12px;
  }

  .info {
    display: flex;
    align-items: start;
    flex: 1;
    p {
      margin: 0;
    }
    .check-box {
      width: 40px;
      flex-shrink: 0;
    }
  }
`

export default CartItem
