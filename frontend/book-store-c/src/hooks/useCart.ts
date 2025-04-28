import { useState, useEffect } from 'react'
import { deleteCart, fetchCart } from '../api/carts.api'
import { ICart } from '../models/cart.model'

export const useCart = () => {
  const [carts, setCarts] = useState<ICart[]>([])
  const [isEmpty, setIsEmpty] = useState(true)

  const deleteCartItem = (productId: string) => {
    deleteCart(productId).then(() => {
      setCarts(carts.filter((cart) => cart.productId !== productId))
    })
    if (carts.length === 1) {
      setIsEmpty(true)
    }
  }
  useEffect(() => {
    fetchCart().then((data) => {
      if (data.length === 0) {
        setIsEmpty(true)
      } else {
        setCarts(data)
        setIsEmpty(false)
      }
    })
  }, [])

  return { carts, isEmpty, deleteCartItem }
}
export default useCart
