export interface IBook {
  id: string
  category_id: string
  title: string
  author: string
  summary: string
  likes: number
  price: number
  img_path: string
}

export interface IBookDetail extends IBook {
  isLiked: number
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

/*
{
    "bookDetail": {
    id: "ebb7d7e7-0dee-11f0-910e-c277ba14597b"
    category_id: 1
    title: "The History of the World"
    author: "Jane Smith"
    summary: "This book covers..."
    likes: 5
    price: 25000
    img_path: "https://picsum.photos/id/11/600/600"



    isLiked: 0
    images: ['https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/600/600','https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/600/600']
    format: "Paperback"
    sub_category_id: "7"
    isbn: "978-1-4028-9462-6"
    pages: 500
    description: "This book covers..."
    table_of_contents: null
    publication_date: "2025-02-27T00:00:00.000Z"
    categoryPath: ['사회', 'History']


  }
}
*/
