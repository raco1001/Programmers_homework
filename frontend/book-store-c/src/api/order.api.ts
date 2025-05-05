import { IOrder, IOrderSheet } from '../models/order.model'
import { requestHandler } from './http'

export const createOrder = async (order: IOrderSheet) => {
  return await requestHandler('POST', '/orders', order)
}

export const fetchOrders = async (): Promise<IOrder[]> => {
  const response = await requestHandler('GET', '/orders')

  if (!response.data) {
    console.error('No data received from orders API')
    return []
  }

  const validOrders = response.data.filter((order: IOrder) => {
    if (!order.status) {
      console.warn('Order missing status:', order)
      return false
    }
    return true
  })

  return validOrders
}

export const fetchOrderItems = async (orderId: string) => {
  const response = await requestHandler('GET', `/orders/${orderId}`)
  return response.data
}

