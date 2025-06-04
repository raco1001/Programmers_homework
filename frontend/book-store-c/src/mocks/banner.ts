import { IBanner } from '@/models/banner.model'
import { http, HttpResponse } from 'msw'

const bannersData = (): IBanner[] => [
  {
    id: 1,
    title: "배너 1",
    description: "Banner 1 Description",
    image: "https://picsum.photos/id/111/1200/400",
    url: "https://www.google.com",
    target: "_blank"
  },
  {
    id: 2,
    title: "배너 2",
    description: "Banner 2 Description",
    image: "https://picsum.photos/id/222/1200/400",
    url: "https://www.google.com",
    target: "_blank"
  },
  {
    id: 3,
    title: "배너 3",
    description: "Banner 3 Description",
    image: "https://picsum.photos/id/33/1200/400",
    url: "https://www.google.com",
    target: "_blank"
  }
]


export const banners = http.get('*/banners', () => {
  return HttpResponse.json(bannersData(), { status: 200 })
})
