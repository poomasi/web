import { atom } from 'recoil'

export const publicIdState = atom<string | null>({
  key: 'publicIdState',
  default: localStorage.getItem('public_id'),
})
