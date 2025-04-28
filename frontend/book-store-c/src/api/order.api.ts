import { IOrder, IOrderItem, IOrderSheet } from '../models/order.model'
import { httpClient } from './http'

export const createOrder = async (order: IOrderSheet) => {
  try {
    const response = await httpClient.post('/orders', order)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await httpClient.get<IOrder[]>('/orders')

    if (!response.data) {
      console.error('No data received from orders API')
      return []
    }

    const validOrders = response.data.filter((order) => {
      if (!order.status) {
        console.warn('Order missing status:', order)
        return false
      }
      return true
    })

    return validOrders
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export const fetchOrderItems = async (orderId: string) => {
  try {
    const response = await httpClient.get<IOrderItem[]>(`/orders/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching order items:', error)
    return []
  }
}
