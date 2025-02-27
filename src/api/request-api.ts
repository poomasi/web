import { AccountsApi } from './accounts/accounts-api'
import { PostsApi } from './posts'
import { AccountListResponse } from './types'

export const RequestApi = {
  accounts: {
    ...AccountsApi,
    getAccountList: async (): Promise<AccountListResponse[]> => {
      try {
        //이 경로가 문제일 가능성 있음
        const response = await fetch('/api/accounts')
        const data = await response.json()

        // 항상 배열을 반환
        return Array.isArray(data) ? data : []
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error)
        return []
      }
    },
  },
  posts: { ...PostsApi },
}
