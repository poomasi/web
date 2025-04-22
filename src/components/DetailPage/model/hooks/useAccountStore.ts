type AccountStore = {
  accountToken: string
  publicId: string
  setAccountToken: (token: string) => void
  setPublicId: (id: string) => void
}

// zustand 예시
import { create } from 'zustand'

export const useAccountStore = create<AccountStore>((set) => ({
  accountToken: '',
  publicId: '',
  setAccountToken: (token) => set({ accountToken: token }),
  setPublicId: (id) => set({ publicId: id }),
}))
