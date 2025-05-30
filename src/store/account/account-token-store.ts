import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AccountType } from '@utils/api/enums'

type AccessTokenStore = {
  accessToken: string | null
  setaccessToken: (token: string) => void
  publicId: string | null
  setPublicId: (id: string) => void
  resetaccessToken: () => void
  // 추가
  accountType: AccountType.MENTOR | AccountType.USER | AccountType.STAFF | null
  setAccountType: (type: AccountType.MENTOR | AccountType.USER | AccountType.STAFF) => void
  nickname: string | null
  setNickname: (nickname: string) => void
}

export const useAccountStore = create<AccessTokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      publicId: null,
      accountType: null,
      nickname: null, // 초기값
      setaccessToken: (token) => set({ accessToken: token }),
      setPublicId: (id) => set({ publicId: id }),
      setAccountType: (type) => set({ accountType: type }),
      setNickname: (nickname) => set({ nickname }),
      // 함수 추가
      resetaccessToken: () => {
        set({
          accessToken: null,
          publicId: null,
          accountType: null,
          nickname: null,
        })
      },
    }),
    {
      name: 'account-token-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

/*
✅ "Recoil에서 localStorage 값을 default로 설정하는 이유는?"
-> 사용자의 로그인 상태를 유지하기 위해서! Recoil 상태는 새로고침하면 사라지지만, localStorage에서 토큰을 가져오면 로그인 상태를 유지할 수 있다.
  */

/*
✅ account_token을 어떻게 활용할 수 있을까?
단순히 localStorage에 저장하는 것만으로 끝나는 게 아니라, API 호출 시 인증(Authorization)에 사용할 수 있다!
*/
