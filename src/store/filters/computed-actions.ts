import { FilterStore } from "./types";
import { RecruitmentFilters } from "@api/types/job.types";
import { PositionResponse } from "@api/types";

export const createComputedActions = (get: () => FilterStore) => ({
	// 현재 적용된 모든 필터 계산
	getAppliedFilters: (): RecruitmentFilters => {
		const state = get();
		const filters: RecruitmentFilters = {};

		// 기본 포지션 필터 (항상 적용됨, 기본값: 1 = Web Frontend)
		filters.position_ids = [state.basicPositionId];

		// 모달 포지션 필터 (추가 선택된 포지션들)
		if (state.selectedPositions.length > 0) {
			filters.position_titles = state.selectedPositions;
		}

		// 회사 필터
		if (state.selectedCompanies.length > 0) {
			filters.company_names = state.selectedCompanies;
		}

		// 경력 필터
		if (
			state.selectedExperience.length > 0 &&
			!state.selectedExperience.includes("전체")
		) {
			filters.experience_years = state.selectedExperience;
		}

		// 위치 필터
		if (
			state.selectedLocations.length > 0 &&
			!state.selectedLocations.includes("전체")
		) {
			filters.locations = state.selectedLocations;
		}

		// 스킬 필터
		if (state.selectedSkills.length > 0) {
			filters.skill_names = state.selectedSkills;
		}

		return filters;
	},

	// 포지션 표시 텍스트 계산 (BasicFilter 컴포넌트에서 사용)
	getPositionDisplayText: (positions: PositionResponse[]): string => {
		const { basicPositionId, selectedPositions } = get();

		// 기본 포지션 텍스트 (항상 있음)
		const selectedPosition = positions.find(
			(p) => p.position_id === basicPositionId
		);
		const basicText = selectedPosition
			? selectedPosition.title
			: "Web Frontend";

		// 모달에서 추가 선택된 포지션이 있으면 "외 N개" 표시
		if (selectedPositions.length > 0) {
			return `${basicText} 외 ${selectedPositions.length}개`;
		}

		return basicText;
	},
});
