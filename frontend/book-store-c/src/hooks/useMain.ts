import { fetchBanners } from "@/api/banner.api"
import { fetchBestBooks, fetchBooks } from "@/api/books.api"
import { fetchMainReviews } from "@/api/review.api"
import { IBanner } from "@/models/banner.model"
import { IBook, IBookReviewItem } from "@/models/book.model"
import { useEffect, useState } from "react"

export const useMain = () => {
  const [reviews, setReviews] = useState<IBookReviewItem[]>([])
  const [newBooks, setNewBooks] = useState<IBook[]>([])
  const [bestBooks, setBestBooks] = useState<IBook[]>([])
  const [banners, setBanners] = useState<IBanner[]>([])

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

    fetchBanners().then((banners) => {
      setBanners(banners)
    })
  }, [])

  return { reviews, bestBooks, newBooks, banners }
}
