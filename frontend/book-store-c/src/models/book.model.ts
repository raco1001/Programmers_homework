export interface IBook {
  id: string
  category_id: number
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
  sub_category_id: string
  isbn: string
  pages: number
  description: string
  table_of_contents: string[] | null
  publication_date: string
  categoryPath: string[]
}


export interface IBookReviewItem {
  reviewId: string
  userName: string
  rating: number
  review: string
  createdAt: string
}

export type BookReviewItemWrite = Pick<IBookReviewItem, 'review' | 'rating'>