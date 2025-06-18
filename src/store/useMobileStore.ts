"use client";

import { create } from "zustand";

type MobileStore = {
	isMobile: boolean;
	setIsMobile: (isMobile: boolean) => void;
};

//isMobile 상태를 전역으로 관리
export const useMobileStore = create<MobileStore>((set) => ({
	isMobile: false,
	setIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
// type MobileStore = {
//   isMobile: boolean
// }

// export const useMobileStore = create<MobileStore>(() => ({
//   isMobile: typeof window !== 'undefined' ? window.innerWidth <= 1024 : false,
// }))
