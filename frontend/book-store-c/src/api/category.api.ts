import { ICategory } from '../models/category.model'
import { httpClient } from './http'

export const fetchCategory = async (): Promise<ICategory[]> => {
  try {
    const response = await httpClient.get('/categories')

    if (!response.data) {
      console.error('No data received from categories API')
      return []
    }

    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
