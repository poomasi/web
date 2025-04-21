import { create } from 'zustand'

type MobileStore = {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

export const useMobileStore = create<MobileStore>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
}))
