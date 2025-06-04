import { BookReviewItemWrite, IBookReviewItem } from '@/models/book.model'
import { fakerKO as faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
const API_URL = process.env.REACT_APP_API_BASE_URL
// const mockReviewsData: IBookReviewItem[] = [
//   {
//     bookId: 'ebb7b7cd-0dee-11f0-910e-c277ba14597b',
//     userName: '홍길동',
//     rating: 5,
//     review: '이 책은 너무 좋아요!',
//     createdAt: '2021-01-01',
//   },
//   {
//     bookId: 'ebb7b7cd-0dee-11f0-910e-c277ba14597b',
//     userName: '이순신',
//     rating: 4,
//     review: '이 책은 좋아요!',
//     createdAt: '2021-01-01',
//   },
//   {
//     bookId: 'ebb7b7cd-0dee-11f0-910e-c277ba14597b',
//     userName: '임꺽정',
//     rating: 3,
//     review: '이 책은 보통이에요.',
//     createdAt: '2021-01-01',
//   },
// ]

const mockReviewData = (): IBookReviewItem[] => {
  return Array.from({ length: 8 }, () => ({
    reviewId: faker.string.uuid(),
    userName: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    review: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}



export const reviewsByBookId =
  http.get(`${API_URL}/reviews/:bookId`, ({ request }) => {
    const bookId = request.url.split('/').pop()
    if (!bookId) {
      return HttpResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }
    try {
      const data: IBookReviewItem[] = mockReviewData()
      return HttpResponse.json(data, { status: 200 })
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }
  })

export const addReview = http.post(`${API_URL}/reviews/:bookId`, async ({ request, params }) => {
  try {
    const newReview = await request.json() as BookReviewItemWrite
    const review: IBookReviewItem = {
      reviewId: faker.string.uuid(),
      userName: '테스트 사용자',
      rating: newReview.rating,
      review: newReview.review,
      createdAt: new Date().toISOString(),
    }
    return HttpResponse.json(review, { status: 201 })
  } catch (error) {
    return HttpResponse.json({ error: 'Failed to add review' }, { status: 500 })
  }
})

export const reviewForMain = http.get(`${API_URL}/reviews`, () => {
  return HttpResponse.json(mockReviewData(), { status: 200 })
})
