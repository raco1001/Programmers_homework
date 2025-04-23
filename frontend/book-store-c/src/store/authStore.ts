import { create } from 'zustand'

interface IStoreState {
  isLoggedIn: boolean
  storeLogin: (token: string) => void
  storeLogout: () => void
}

export const getToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return token
  }
  return null
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const useAuthStore = create<IStoreState>((set) => ({
  isLoggedIn: getToken() ? true : false,
  storeLogin: (token: string) => {
    setToken(token)
    set({ isLoggedIn: true })
  },
  storeLogout: () => {
    removeToken()
    set({ isLoggedIn: false })
  },
}))
