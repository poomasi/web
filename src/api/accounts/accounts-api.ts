import { HttpMethod, AccountType } from '@api/enums'
import requestHandler from '@api/request-handler'
import { KakaoLoginResponse, AccountListResponse } from '@api/types'

const PATH = '/accounts'

export const AccountsApi = {
  postKakaoLogin: async (idToken: string) => {
    return await requestHandler<KakaoLoginResponse>({ url: PATH + '/kakao-login', method: HttpMethod.POST, data: { id_token: idToken } })
  },

  getAccountList: async (type: string = AccountType.ADMIN) => {
    return await requestHandler<Array<AccountListResponse>>({ url: PATH + `/?type=${type}` })
  },

  getAccount: async (id?: string) => {
    return await requestHandler<Array<AccountListResponse>>({ url: PATH + `/${id}` })
  },
}
