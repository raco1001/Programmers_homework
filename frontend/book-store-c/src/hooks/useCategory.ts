import { fetchCategory } from '@/api/category.api'
import { ICategory } from '@/models/category.model'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useCategory = () => {
  const location = useLocation()
  const [category, setCategory] = useState<ICategory[]>([])
  const setActive = () => {
    const params = new URLSearchParams(location.search)
    if (params.get('category_id')) {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: item.id === Number(params.get('category_id')),
          }
        })
      })
    } else {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false,
          }
        })
      })
    }
  }

  useEffect(() => {
    fetchCategory().then((categories) => {
      if (!categories) return
      const categoryWithAll = [{ id: null, name: '전체' }, ...categories] as ICategory[]
      setCategory(categoryWithAll)
      setActive()
    })
  }, [location.search])

  return { category }
}
