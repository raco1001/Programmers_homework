import { IOrderSheet } from '../models/order.model'
import { httpClient } from './http'

export const createOrder = async (order: IOrderSheet) => {
  try {
    const response = await httpClient.post('/orders', order)
    return response.data
  } catch (error) {
    throw error
  }
}
