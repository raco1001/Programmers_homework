import { SignupProps } from '../pages/Signup'
import { httpClient } from './http'

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post('/users/join', userData)
  return response.data
}

export const userEmailValidationRequest = async (userData: SignupProps) => {
  const response = await httpClient.post('/users/validateEmail', userData)
  console.log(response.data)
  return response.data
}

export const resetPassword = async (userData: SignupProps) => {
  console.log(userData)
  const { email, password } = userData
  const response = await httpClient.put(`/users/reset/${email}`, {
    password: password,
  })
  return response.data
}

interface LoginResponse {
  token: string
}

export const login = async (userData: SignupProps): Promise<LoginResponse> => {
  const response = await httpClient.post('/auth/login', userData)
  return response.data
}
