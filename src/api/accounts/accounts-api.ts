import { HttpMethod, AccountType } from '@api/enums'
import requestHandler from '@api/request-handler'
import { KakaoLoginResponse, AccountListResponse, AccountResponse } from '@api/types'
import customAxios from '@api/customAxios.ts'

const PATH = '/accounts'

export const AccountsApi = {
  postKakaoLogin: async (idToken: string) => {
    return await customAxios.post<{ account_token: string; public_id: string }>(`${PATH}/kakao-login`, { id_token: idToken })
  },

  getAccountList: async (type: string = AccountType.ADMIN) => {
    return await requestHandler<Array<AccountListResponse>>({ url: PATH + `/?type=${type}` })
  },

  getAccount: async (id?: string) => {
    return await requestHandler<AccountResponse>({ url: PATH + `/${id}` })
  },
  // getAccount: async (id?: string) => {
  //   return await requestHandler<Array<AccountListResponse>>({ url: PATH + `/${id}` })
  // },
}
