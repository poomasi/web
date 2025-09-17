import { FilterStore } from "./types";

export const createFilterActions = (set: any, get: () => FilterStore) => ({
	// 선택 상태 배열 관리
	togglePosition: (positionId: number) => {
		const { selectedPositionIds } = get();
		const newSelected = selectedPositionIds.includes(positionId)
			? selectedPositionIds.filter((p) => p !== positionId)
			: [...selectedPositionIds, positionId];
		set({ selectedPositionIds: newSelected });
	},

	toggleCompany: (company: string) => {
		const { selectedCompanies } = get();
		const newSelected = selectedCompanies.includes(company)
			? selectedCompanies.filter((c) => c !== company)
			: [...selectedCompanies, company];
		set({ selectedCompanies: newSelected });
	},

	toggleExperience: (experience: string) => {
		const { selectedExperience } = get();
		const newSelected = selectedExperience.includes(experience)
			? selectedExperience.filter((e) => e !== experience)
			: [...selectedExperience, experience];
		set({ selectedExperience: newSelected });
	},

	toggleLocation: (location: string) => {
		const { selectedLocations } = get();
		const newSelected = selectedLocations.includes(location)
			? selectedLocations.filter((l) => l !== location)
			: [...selectedLocations, location];
		set({ selectedLocations: newSelected });
	},

	toggleSkill: (skillId: number) => {
		const { selectedSkillIds } = get();
		const newSelected = selectedSkillIds.includes(skillId)
			? selectedSkillIds.filter((s) => s !== skillId)
			: [...selectedSkillIds, skillId];
		set({ selectedSkillIds: newSelected });
	},

	// 필터 초기화
	clearAllFilters: () => {
		set({
			selectedPositionIds: [],
			selectedCompanies: [],
			selectedExperience: [],
			selectedLocations: [],
			selectedSkillIds: [],
		});
	},

	clearPositions: () => set({ selectedPositionIds: [] }),
	clearCompanies: () => set({ selectedCompanies: [] }),
	clearExperience: () => set({ selectedExperience: [] }),
	clearLocations: () => set({ selectedLocations: [] }),
	clearSkills: () => set({ selectedSkillIds: [] }),

	// 최종 필터 저장
	setActiveFilters: (filters: any) => {
		set({ activeFilters: filters });
	},

	// 적용 시 문자열→ID 변환 + activeFilters 저장
	applyFilters: (ctx: any) => {
		const state = get();

		// 필터 적용 로직 (필요시 구현)
		console.log("필터 적용됨:", {
			positionIds: state.selectedPositionIds,
			companies: state.selectedCompanies,
			experience: state.selectedExperience,
			locations: state.selectedLocations,
			skillIds: state.selectedSkillIds,
		});

		// 모달 닫기
		setTimeout(() => {
			set({ isModalOpen: false, activeModalType: null });
		}, 0);
	},
});
