import { atom } from 'recoil'

//토스트 메시지가 열려 있는지를 관리
export const isErrorToastOpenState = atom<boolean>({
  key: 'isErrorToastOpenState',
  default: false,
})

export const isSuccessToastOpenState = atom<boolean>({
  key: 'isSuccessToastOpenState',
  default: false,
})
