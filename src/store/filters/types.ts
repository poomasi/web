import { RecruitmentResponse } from "@api/types";
import type { RecruitmentFilters } from "@api/types/job.types";

export interface FilterState {
	// 동적 필터 옵션들 (jobs 데이터에서 추출)
	experienceOptions: string[];
	locationOptions: string[];

	// 선택된 필터들
	selectedPositionIds: number[];
	selectedCompanies: string[];
	selectedExperience: string[];
	selectedLocations: string[];
	selectedSkillIds: number[];

	// UI 상태
	isModalOpen: boolean;
	activeModalType: string | null;
	activeFilters: RecruitmentFilters;
}

export interface ApplyCtx {
	positions: { position_id: number; title?: string }[];
	companies: { public_id: string; name?: string }[];
	skills: { skill_id: number; name?: string }[];
}

export interface FilterActions {
	// 필터 옵션 추출
	extractFilterOptions: (jobs: RecruitmentResponse[]) => void;

	// 모달 제어
	openModal: (type: string) => void;
	closeModal: () => void;

	// 필터 선택
	togglePosition: (positionId: number) => void;
	toggleCompany: (company: string) => void;
	toggleExperience: (experience: string) => void;
	toggleLocation: (location: string) => void;
	toggleSkill: (skillId: number) => void;

	// 필터 초기화
	clearAllFilters: () => void;
	clearPositions: () => void;
	clearCompanies: () => void;
	clearExperience: () => void;
	clearLocations: () => void;
	clearSkills: () => void;

	// 최종 필터 저장
	setActiveFilters: (filters: RecruitmentFilters) => void;

	// 적용 시 문자열→ID 변환 + activeFilters 저장
	applyFilters: (ctx: ApplyCtx) => void;
}

export type FilterStore = FilterState & FilterActions;
