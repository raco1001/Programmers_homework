import { httpClient } from './http'
import { ICart } from '../models/cart.model'
interface AddCartRequest {
  bookId: string
  quantity: number
}

export const addCart = async (request: AddCartRequest) => {
  const response = await httpClient.post(`/carts`, request)
  return response.data
}

export const fetchCart = async () => {
  const response = await httpClient.get<ICart[]>(`/carts`)
  console.log(response.data)
  return response.data
}

export const deleteCart = async (productId: string) => {
  const response = await httpClient.delete(`/carts/${productId}`)
  return response.data
}
