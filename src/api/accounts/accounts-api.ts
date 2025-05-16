import { AccountType } from '@api/enums'
// import requestHandler from '@api/request-handler'
import { AccountListResponse, AccountResponse } from '@api/types'
import customAxios from '@api/customAxios.ts'

const PATH = '/accounts'

export const AccountsApi = {
  postKakaoLogin: async (requestDto: { id_token: string; device_token: string | null }) => {
    return await customAxios.post<{
      access_token: string
      public_id: string
      account_type: AccountType
    }>(`${PATH}/kakao-login`, requestDto)
  },

  getAccountList: async (type: string = AccountType.MENTOR) => {
    return await customAxios.post<AccountListResponse[]>(PATH + `/?type=${type}`, {})
  },

  // Teacher 이라는 API 로 분리해야 함. 그래야 의도가 명확해짐.
  // 추후 품앗이 관련 데이터를 가져오는 API 들은 TeacherApi 로 분리 예정
  // 품앗이 데이터 가져오는 API
  getAccount: async (id: string) => {
    return await customAxios.get<AccountResponse>(PATH + `/${id}`)
  },
}
