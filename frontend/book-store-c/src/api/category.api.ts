
import { ICategory } from '../models/category.model'
import { httpClient } from './http'

export const fetchCategory = async () => {
  try {
    const response = await httpClient.get<ICategory[]>('/categories')

    if (!response.data) {
      console.error('No data received from categories API')
      return []
    }

    return response.data
  } catch (error) {
    return []
  }
}
