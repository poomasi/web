import { AccountsApi } from './accounts/accounts-api'
import { PostsApi } from './posts'
import { AccountListResponse } from './types'

//RequestApi는 accounts와 posts 두 개의 키를 가지는 객체
export const RequestApi = {
  accounts: {
    ...AccountsApi,
    //API 요청 함수
    //매개변수를 받지 않고 Promise<AccountListResponse[]>를 반환한다
    getAccountList: async (): Promise<AccountListResponse[]> => {
      try {
        const response = await fetch('https://api.poomasi.kr/api/v1/accounts/?type=ADMIN', {
          method: 'GET',
          headers: {
            // Accept: 'application/json',
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
