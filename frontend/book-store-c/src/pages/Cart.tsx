import { styled } from 'styled-components'
import Title from '../components/common/Title'
import CartItem from '../components/cart/CartItem'
import useCart from '../hooks/useCart'
import { useMemo, useState } from 'react'
import Empty from '../components/common/Empty'
import { FaShoppingCart } from 'react-icons/fa'
import CartSummary from '../components/cart/CartSumary'
import Button from '../components/common/Button'
import { useAlert } from '../hooks/useAlert'
import { IOrderSheet } from '../models/order.model'
import { useNavigate } from 'react-router-dom'
import { Theme } from '../style/theme'
import { ICartItem } from '../models/cart.model'

export interface ICheckedItem extends ICartItem {
  priceSum: number
}

function Cart() {
  const { carts, deleteCartItem, isEmpty } = useCart()
  const navigate = useNavigate()
  const [checkedItems, setCheckedItems] = useState<ICheckedItem[]>([])
  const { showAlert, showConfirm } = useAlert()
  const handleCheckItem = (productId: string) => {
    const cart = carts.find((cart) => cart.productId === productId)
    if (!cart) return
    const checkedItem = checkedItems.find(
      (checkedItem) => checkedItem.productId === productId,
    )
    if (!checkedItem) {
      const checkedItem = {
        productId: cart.productId,
        quantity: cart.quantity,
        priceSum: cart.price * cart.quantity,
      }
      setCheckedItems([...checkedItems, checkedItem])
    } else {
      setCheckedItems(
        checkedItems.filter((item) => item.productId !== productId),
      )
    }
  }
  const handleDeleteItem = (productId: string) => {
    deleteCartItem(productId)
  }

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해주세요.')
      return
    }

    const orderData: Omit<IOrderSheet, 'delivery'> = {
      items: checkedItems,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
      firstProductId: checkedItems[0].productId,
    }
    showConfirm('주문하시겠습니까?', () => {
      navigate('/order', { state: orderData })
    })
  }

  const totalQuantity = useMemo(() => {
    return checkedItems.reduce((acc, checkedItem) => {
      acc = acc + checkedItem.quantity
      return acc
    }, 0)
  }, [checkedItems])

  const totalPrice = useMemo(() => {
    return checkedItems.reduce((acc, checkedItem) => {
      acc = acc + checkedItem.priceSum
      return acc
    }, 0)
  }, [checkedItems])

  return (
    <>
      <Title size="large" color="text">
        장바구니
      </Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((cart) => (
                <CartItem
                  key={cart.productId}
                  cart={cart}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
              />
              <Button size="large" schema="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다."
            description="상품을 추가해주세요."
            icon={<FaShoppingCart />}
          />
        )}
      </CartStyle>
    </>
  )
}

export const CartStyle = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    padding: 16px 0 0 0;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }
  }
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }
  }
  .error-text {
    color: red;
    margin: 0;
    padding: 0 0 12px 0;
    text-align: right;
  }
`
export default Cart
