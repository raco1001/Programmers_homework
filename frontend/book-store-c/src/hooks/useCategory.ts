import { useEffect, useState } from 'react'
import { fetchCategory } from '../api/category.api'
import { ICategory } from '../models/category.model'

export const useCategory = () => {
  const [category, setCategory] = useState<ICategory[]>([])

  useEffect(() => {
    fetchCategory().then((categories) => {
      if (!categories) return
      const categoryWithAll = [{ id: null, name: '전체' }, ...categories]
      setCategory(categoryWithAll)
    })
  }, [])

  return { category }
}
