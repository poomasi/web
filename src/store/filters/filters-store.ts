import { create } from "zustand";
import { RecruitmentFilters } from "@api/types/job.types";

// 상태(State)의 타입 정의
interface FilterState {
	/** 사용자가 선택한 모든 필터 값을 담는 단일 객체 */
	selectedFilters: RecruitmentFilters;
	/** 필터 모달의 열림/닫힘 상태 */
	isModalOpen: boolean;
}

// 액션(Actions)의 타입 정의
interface FilterActions {
	/** selectedFilters의 일부 또는 전체를 업데이트하는 함수 */
	setFilters: (newFilters: Partial<RecruitmentFilters>) => void;
	/** 모든 필터를 초기 상태로 리셋하는 함수 */
	clearAllFilters: () => void;
	/** 모달을 여는 함수 */
	openModal: () => void;
	/** 모달을 닫는 함수 */
	closeModal: () => void;
}

// 기본 필터값 설정
const INITIAL_FILTERS: RecruitmentFilters = {
	position_ids: [1], // 페이지 최초 진입 시 기본값 'webfront' (ID: 1)
	company_names: [],
	experience_years: [],
	locations: [],
	skill_ids: [],
};

// Zustand 스토어 생성.
export const useFilterStore = create<FilterState & FilterActions>((set) => ({
	// --- 초기 상태 ---
	selectedFilters: INITIAL_FILTERS,
	isModalOpen: false,

	// --- 액션 구현 ---
	setFilters: (newFilters) =>
		set((state) => ({
			selectedFilters: { ...state.selectedFilters, ...newFilters },
		})),

	clearAllFilters: () =>
		set({
			selectedFilters: INITIAL_FILTERS,
		}),

	openModal: () => set({ isModalOpen: true }),

	closeModal: () => set({ isModalOpen: false }),
}));
