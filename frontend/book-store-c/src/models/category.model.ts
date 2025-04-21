export interface ICategory {
  id: number | null
  name: string
}

export const Categories: ICategory[] = [
  { id: 1, name: '전체' },
  { id: 2, name: '동화' },
  { id: 3, name: '소설' },
]
