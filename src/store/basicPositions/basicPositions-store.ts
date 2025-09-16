import { create } from "zustand";

interface PositionsState {
	selectedPositions: string[];
	setSelectedPositions: (positions: string[]) => void;
	clearSelectedPositions: () => void;
}

export const useBasicPositionsStore = create<PositionsState>((set) => ({
	// 초기 상태
	selectedPositions: [],

	// 선택된 포지션 설정
	setSelectedPositions: (selectedPositions: string[]) => {
		set({ selectedPositions });
	},

	// 선택된 포지션 초기화
	clearSelectedPositions: () => {
		set({ selectedPositions: [] });
	},
}));
