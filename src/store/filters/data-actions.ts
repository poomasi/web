export { useFilterStore } from "./filters-store";
export type { FilterState, FilterActions, FilterStore } from "./types";
import { RecruitmentResponse } from "@api/types";
import { SkillsApi } from "@api/skills";
import { CompaniesApi } from "@api/companies";
import {
	POPULAR_SKILLS_CONFIG,
	PopularSkillData,
	PopularSkillConfig,
} from "@constants/popularSkills";
import { FilterStore } from "./types";

export const createDataActions = (set: any, get: () => FilterStore) => ({
	// jobs 데이터 설정
	setJobs: (jobs: RecruitmentResponse[]) => {
		set({ jobs });
		// jobs 데이터가 설정되면 필터 옵션들을 추출
		get().extractFilterOptions();
	},

	// 필터 옵션 추출
	extractFilterOptions: () => {
		const { jobs } = get();

		// 경력 옵션 추출
		const experienceSet = new Set<string>();
		experienceSet.add("전체");
		jobs.forEach((job) => {
			if (job.experience_years) {
				experienceSet.add(job.experience_years);
			}
		});

		// 위치 옵션 추출
		const locationSet = new Set<string>();
		locationSet.add("전체");
		jobs.forEach((job) => {
			if (job.company_address_depth1) {
				locationSet.add(job.company_address_depth1);
			}
		});

		set({
			experienceOptions: Array.from(experienceSet).sort(),
			locationOptions: Array.from(locationSet).sort(),
		});
	},

	// 포지션 데이터 로딩
	fetchPositions: async () => {
		set({ loading: true, error: null });
		try {
			const positionsStore = await import("@store/basicPositions");
			const { positions: existingPositions, fetchPositions: fetchFromStore } =
				positionsStore.useBasicPositionsStore.getState();

			if (existingPositions.length === 0) {
				await fetchFromStore();
				const { positions } = positionsStore.useBasicPositionsStore.getState();
				set({ positions, loading: false });
			} else {
				set({ positions: existingPositions, loading: false });
			}
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "포지션 데이터 로딩 실패",
				loading: false,
			});
		}
	},

	// 회사 데이터 로딩
	fetchCompanies: async () => {
		const { companies } = get();
		if (companies.length > 0) {
			console.log("Companies 데이터 재사용 (중복 호출 방지)");
			return;
		}

		set({ loading: true, error: null });
		try {
			console.log("Companies API 최초 호출");
			const response = await CompaniesApi.getParentCompanies();
			set({ companies: response.data, loading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "회사 데이터 로딩 실패",
				loading: false,
			});
		}
	},

	// 스킬 데이터 로딩
	fetchSkills: async () => {
		const { skills } = get();
		if (skills.length > 0) {
			console.log("Skills 데이터 재사용 (중복 호출 방지)");
			return;
		}

		set({ loading: true, error: null });
		try {
			console.log("Skills API 최초 호출");
			const skillsData = await SkillsApi.getSkills();

			// 인기 스택 설정에 따라 매칭되는 스킬 찾기
			const popularSkills: PopularSkillData[] = [];

			POPULAR_SKILLS_CONFIG.forEach((config: PopularSkillConfig) => {
				const matchedSkill = skillsData.find((skill) =>
					config.apiSearchTerms.some((term: string) =>
						skill.name.toLowerCase().includes(term.toLowerCase())
					)
				);

				if (matchedSkill) {
					popularSkills.push({
						displayName: config.displayName,
						skill_id: matchedSkill.skill_id,
						name: matchedSkill.name,
						designed_logo_url: matchedSkill.designed_logo_url,
						logo_url: matchedSkill.logo_url, // 추가!
					});
				}
			});

			console.log("매칭된 인기 스택:", popularSkills);
			set({ skills: skillsData, popularSkills, loading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "기술 스택 데이터 로딩 실패",
				loading: false,
			});
		}
	},
});
