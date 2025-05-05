import { setupWorker } from 'msw/browser'
import { addReview, reviewsByBookId } from './review'

const handlers = [
  reviewsByBookId,
  addReview,
]

export const worker = setupWorker(...handlers)
