import { useEffect, useState } from 'react'
import { IOrderListItems } from '../models/order.model'
import { fetchOrderItems, fetchOrders } from '../api/order.api'

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrderListItems[]>([])
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders.map((order) => ({ ...order, detail: [] })))
    })
  }, [])

  const selectOrderItems = async (orderId: string) => {
    try {
      // 이미 조회된 주문 상세 내역이 있는 경우 조회하지 않음
      const existingOrder = orders.find((item) => item.orderId === orderId)
      if (existingOrder?.detail && existingOrder.detail.length > 0) {
        setSelectedOrderId(selectedOrderId === orderId ? null : orderId)
        return
      }

      fetchOrderItems(orderId).then((orderDetail) => {
        setSelectedOrderId(orderId)
        setOrders(
          orders.map((item) => {
            if (item.orderId === orderId) {
              return { ...item, detail: orderDetail }
            } else {
              return { ...item }
            }
          }),
        )
      })
    } catch (err) {
      console.error('Error fetching order items:', err)
      setError('Failed to load order items')
    }
  }

  return {
    orders,
    selectedOrderId,
    selectOrderItems,
    error,
  }
}

export default useOrders
