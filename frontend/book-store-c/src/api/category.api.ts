import { ICategory } from '../models/category.model'
import { httpClient } from './http'

export const fetchCategory = async (): Promise<ICategory[]> => {
  const response = await httpClient.get('/categories')
  return response.data
}
