import { ICartItem } from './cart.model'

export interface IOrder {
  orderId: string
  createdAt: string
  address: string
  receiver: string
  contact: string
  bookTitle: string
  totalPrice: number
  totalQuantity: number
  status: string
}

export interface IOrderSheet {
  items: ICartItem[]
  totalQuantity: number
  totalPrice: number
  firstBookTitle: string
  delivery: Delivery
}

export interface Delivery {
  address: string
  zipCode: string
  receiver: string
  contact: string
}
