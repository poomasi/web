import { RecruitmentResponse } from "@api/types";

export interface FilterState {
	// 동적 필터 옵션들 (jobs 데이터에서 추출)
	experienceOptions: string[];
	locationOptions: string[];

	// 선택된 필터들
	selectedPositionIds: number[];
	selectedCompanies: string[];
	selectedExperience: string[];
	selectedLocations: string[];
	selectedSkills: string[];

	// UI 상태
	isModalOpen: boolean;
	activeModalType: string | null;
}

export interface FilterActions {
	// 필터 옵션 추출
	extractFilterOptions: (jobs: RecruitmentResponse[]) => void;

	// 모달 제어
	openModal: (type: string) => void;
	closeModal: () => void;

	// 필터 선택
	togglePosition: (positionId: number | string) => void;
	toggleCompany: (company: string | number) => void;
	toggleExperience: (experience: string | number) => void;
	toggleLocation: (location: string | number) => void;
	toggleSkill: (skill: string | number) => void;

	// 필터 초기화
	clearAllFilters: () => void;
	clearPositions: () => void;
	clearCompanies: () => void;
	clearExperience: () => void;
	clearLocations: () => void;
	clearSkills: () => void;

	// 필터 적용
	applyFilters: () => void;
}

export type FilterStore = FilterState & FilterActions;
