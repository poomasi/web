import { FilterStore } from "./types";

export const createModalActions = (set: any, get: () => FilterStore) => ({
	// 모달 제어
	openModal: (type: string) => {
		set({ isModalOpen: true, activeModalType: type });

		const {
			positions,
			companies,
			skills,
			fetchPositions,
			fetchCompanies,
			fetchSkills,
		} = get();

		// 필요한 데이터 로딩
		if (companies.length === 0) {
			fetchCompanies();
		}

		if (
			(type === "all" ||
				type === "company" ||
				type === "experience" ||
				type === "location") &&
			positions.length === 0
		) {
			fetchPositions();
		}

		if (skills.length === 0) {
			fetchSkills();
		}
	},

	closeModal: () => {
		set({ isModalOpen: false, activeModalType: null });
	},

	// 필터 적용
	applyFilters: () => {
		const state = get();

		console.log("필터 적용됨:", {
			positions: state.selectedPositions,
			companies: state.selectedCompanies,
			experience: state.selectedExperience,
			locations: state.selectedLocations,
			skills: state.selectedSkills,
		});

		setTimeout(() => {
			set({ isModalOpen: false, activeModalType: null });
		}, 0);
	},
});
