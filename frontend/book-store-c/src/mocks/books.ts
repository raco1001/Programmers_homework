import { fakerKO as faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
import { IBook } from '../models/book.model'
const API_URL = process.env.REACT_APP_API_BASE_URL



const bestBooksData = (): IBook[] => Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(5),
  author: faker.person.fullName(),
  summary: faker.lorem.paragraph(),
  likes: faker.number.int({ min: 100, max: 500 }),
  category_id: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
  price: faker.number.int({ min: 10000, max: 50000 }),
  img_path: faker.image.url(),
}))

export const bestBooks = http.get(`${API_URL}/books/best`, () => {
  return HttpResponse.json({ books: bestBooksData() },
    { status: 200 }
  )
})
