import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { DefaultApiResponse } from '../types/api/DefaultApiResponse.ts'
import { useAccountStore } from '@store/account'

// @ts-ignore
export interface CustomInstance extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<DefaultApiResponse<T>>

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<DefaultApiResponse<T>>

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<DefaultApiResponse<T>>
}

const customAxios: CustomInstance = axios.create({
  baseURL: import.meta.env.VITE_POOMASI_BACEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60, // 1분
})

customAxios.interceptors.request.use(function (request) {
  const token = useAccountStore.getState().accountToken
  if (token) {
    console.log('token', token)
    request.headers.Authorization = token
  }
  return request
})

customAxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // axios 시간 초과 오류
    if (error.code === 'ECONNABORTED') {
      return Promise.reject('API 요청 시간을 초과하였습니다.')
    }

    return Promise.reject(error)
  },
)

export default customAxios
