import axios, { AxiosRequestConfig } from 'axios'
import { getToken, removeToken } from '../store/authStore'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const DEFAULT_TIMEOUT = 30000

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? `Bearer ${getToken()}` : '',
    },
    withCredentials: true,
    ...config,
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {

      if (error.response?.status === 401) {
        removeToken()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T,
) => {
  let response
  switch (method) {
    case 'POST':
      response = await httpClient.post(url, payload)
      break
    case 'GET':
      response = await httpClient.get(url)
      break
    case 'PUT':
      response = await httpClient.put(url, payload)
      break
    case 'DELETE':
      response = await httpClient.delete(url)
      break
    default:
      throw new Error('Invalid request method')
  }
  return response
}

export const httpClient = createClient()
