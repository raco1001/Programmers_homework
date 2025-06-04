import { IBanner } from '@/models/banner.model'
import { requestHandler } from './http'

export const fetchBanners = async (): Promise<IBanner[]> => {
  const response = await requestHandler<IBanner[]>('GET', '/banners')
  return response.data
}
