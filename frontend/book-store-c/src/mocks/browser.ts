import { setupWorker } from 'msw/browser'
import { addReview, reviewForMain, reviewsByBookId } from './review'

const API_URL = process.env.REACT_APP_API_BASE_URL

const handlers = [
  reviewsByBookId,
  addReview,
  reviewForMain,
]
export const worker = setupWorker(...handlers)
