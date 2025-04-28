export interface ICartItem {
  productId: string
  quantity: number
}

export interface ICart extends ICartItem {
  title: string
  price: number
  summary: string
  img_path: string
  author: string
  pages: number
}
