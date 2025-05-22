import { AccountsApi } from './accounts/accounts-api'
import { PostsApi } from './posts'
import { AccountListResponse } from './types/account.types'

const token = localStorage.getItem('access_token') ?? ''

//RequestApi는 두 개의 카테고리로 구성된 API 모듈 객체
export const RequestApi = {
  accounts: {
    ...AccountsApi,
    //관리자 계정 리스트를 불러오는 함수
    getAccountList: async (): Promise<AccountListResponse[]> => {
      try {
        //관리자 계정들만 필터링해서 요청
        const response = await fetch('https://api.poomasi.kr/api/v1/accounts?type=MENTOR', {
          method: 'GET',
          headers: {
            Authorization: token,
            // 'Content-Type': 'application/json',
          },
        })
        const data = await response.json()

        //Array.isArray(): 배열인지 체크하는 메소드
        return Array.isArray(data.data) ? data.data : []
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error)
        return []
      }
    },
  },
  posts: { ...PostsApi },
}
