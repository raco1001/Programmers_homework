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
  isLiked: boolean
  images: string[]
  format: string
  isbn: string
  pages: number
  description: string
  table_of_contents: string[] | null
  publication_date: string
}

//   {
//     "bookDetail": {
//         "id": "ebb7b7cd-0dee-11f0-910e-c277ba14597b",
//         "category_id": 0,
//         "title": "The Great Adventure",
//         "author": "John Doe",
//         "img": "https://picsum.photos/id/12/600/600",
//         "likes": 10,
//         "summary": "A thrilling journey of discovery.",
//         "price": 20000,
// \
//         "sub_category_id": "4",
//         "format": "Hardcover",

//         "isbn": "978-3-16-148410-0",
//         "pages": 350,

//         "description": "This book explores...",
//         "table_of_contents": null,
//         "publication_date": "2025-01-05T00:00:00.000Z",

//         "categoryPath": [
//             "소설",
//             "Fantasy"
//         ]
//     }
