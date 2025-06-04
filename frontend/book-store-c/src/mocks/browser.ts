import { setupWorker } from 'msw/browser'
import { banners } from './banner'
import { bestBooks } from './books'
import { addReview, reviewForMain, reviewsByBookId } from './review'

const handlers = [
  reviewsByBookId,
  addReview,
  reviewForMain,
  bestBooks,
  banners,
]

// @ts-ignore - MSW v2 타입 시스템 이슈
export const worker = setupWorker(...handlers)

// WebSocket 연결 오류 무시
worker.events.on('unhandledException', ({ error }) => {
  if (error.message.includes('WebSocket connection')) {
    return
  }
  throw error
})
