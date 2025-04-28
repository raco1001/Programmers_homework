import { ICartItem } from './cart.model'

export interface IOrder {
  orderId: string
  createdAt: string
  address: string
  receiver: string
  contact: string
  firstTitle: string
  totalPrice: number
  totalQuantity: number
  status: string
}

export interface IOrderSheet {
  items: ICartItem[]
  totalQuantity: number
  totalPrice: number
  firstProductId: string
  delivery: Delivery
}

export interface Delivery {
  address: string
  zipCode: string
  receiver: string
  contact: string
}
export interface IOrderItem {
  orderItemId: string
  productId: string
  title: string
  author: string
  imgPath: string
  totalPrice: number
  totalQuantity: number
}

export interface IOrderListItems extends IOrder {
  detail?: IOrderItem[]
}
