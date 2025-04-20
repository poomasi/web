import { create } from 'zustand'

type ToastMessageStore = {
  errorToastMessage: string
  successToastMessage: string
  setErrorToastMessage: (message: string) => void
  setSuccessToastMessage: (message: string) => void
  removeSuccessToastMessage: () => void
  removeErrorToastMessage: () => void
}

export const useToastMessageStore = create<ToastMessageStore>((set) => ({
  errorToastMessage: '',
  successToastMessage: '',
  setErrorToastMessage: (message: string) => {
    set({ errorToastMessage: message })
  },
  setSuccessToastMessage: (message: string) => {
    set({ successToastMessage: message })
  },
  removeSuccessToastMessage: () => {
    set({ successToastMessage: '' })
  },
  removeErrorToastMessage: () => {
    set({ errorToastMessage: '' })
  },
}))
