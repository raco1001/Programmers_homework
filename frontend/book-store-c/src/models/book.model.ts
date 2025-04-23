export interface IBook {
  id: number
  category_id: string
  title: string
  author: string
  summary: string
  likes: number
  price: number
  img_path: string
}

export interface IBookDetail extends IBook {
  isLiked: boolean
  images: string[]
  format: string
  isbn: string
  pages: number
  description: string
  table_of_contents: string[] | null
  publication_date: string
}
