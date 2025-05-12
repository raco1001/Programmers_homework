import { fetchBestBooks, fetchBooks } from "@/api/books.api"
import { fetchMainReviews } from "@/api/review.api"
import { IBook, IBookReviewItem } from "@/models/book.model"
import { useEffect, useState } from "react"

export const useMain = () => {
  const [reviews, setReviews] = useState<IBookReviewItem[]>([])
  const [newBooks, setNewBooks] = useState<IBook[]>([])
  const [bestBooks, setBestBooks] = useState<IBook[]>([])

  useEffect(() => {
    fetchMainReviews().then((reviews) => {
      setReviews(reviews)
    })
    fetchBestBooks().then(({ books }) => {
      console.log(books)
      setBestBooks(books)
    })
    fetchBooks({ category_id: undefined, news: true, currentPage: 1, limit: 10 }).then(({ books }) => {
      setNewBooks(books)
    })
  }, [])

  return { reviews, bestBooks, newBooks }
}
