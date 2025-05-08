import { fetchMainReviews } from "@/api/review.api"
import { IBookReviewItem } from "@/models/book.model"
import { useEffect, useState } from "react"
export const useMain = () => {
  const [reviews, setReviews] = useState<IBookReviewItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        const response = await fetchMainReviews()
        setReviews(response)
        console.log(response)
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReviews()
  }, [])

  return { reviews, isLoading, error }
}
