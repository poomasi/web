import { useMemo } from "react";
import { RecruitmentResponse, RecruitmentFilters } from "@api/types/job.types";
import { useFilterStore } from "@store/filters";

interface UseDetailJobsFiltersProps {
	allJobs: RecruitmentResponse[];
	filters: RecruitmentFilters;
}

interface UseDetailJobsFiltersReturn {
	filteredJobs: RecruitmentResponse[];
}

/**
 * 상세한 필터링 로직을 담당하는 훅
 * 스킬, 포지션, 경력, 회사, 위치 등 다양한 필터를 적용하여 채용공고를 필터링합니다.
 */
export function useDetailJobsFilters({
	allJobs,
	filters,
}: UseDetailJobsFiltersProps): UseDetailJobsFiltersReturn {
	const { skills } = useFilterStore();

	const filteredJobs = useMemo(() => {
		return allJobs.filter((job) => {
			// 스킬 필터
			if (filters.skill_ids && filters.skill_ids.length > 0) {
				// JobSkill에는 skill_id가 없고 skill_name만 있으므로 이름으로 매칭
				const hasMatchingSkill = job.skills.some((jobSkill) => {
					// skill_ids 배열의 각 ID에 대해 해당하는 스킬명 찾기
					return filters.skill_ids!.some((skillId) => {
						// Skills API 데이터에서 해당 ID의 스킬 정보 찾기
						const skillFromApi = skills.find((s) => s.skill_id === skillId);
						if (!skillFromApi) return false;

						const jobSkillName = jobSkill.skill_name.toLowerCase();
						const apiSkillName = skillFromApi.name.toLowerCase();

						// 정확한 이름 매칭 또는 포함 관계 확인
						return (
							jobSkillName.includes(apiSkillName) ||
							apiSkillName.includes(jobSkillName)
						);
					});
				});
				if (!hasMatchingSkill) return false;
			}

			// 포지션 필터
			if (filters.position_titles && filters.position_titles.length > 0) {
				if (!filters.position_titles.includes(job.position_title)) return false;
			}

			// 경력 필터
			if (filters.experience_years && filters.experience_years.length > 0) {
				if (!filters.experience_years.includes(job.experience_years as any))
					return false;
			}

			// 회사 필터
			if (
				(filters as any).company_names &&
				(filters as any).company_names.length > 0
			) {
				if (!(filters as any).company_names.includes(job.parent_company_name))
					return false;
			}

			// 위치 필터
			if ((filters as any).locations && (filters as any).locations.length > 0) {
				if (!(filters as any).locations.includes(job.company_address_depth1))
					return false;
			}

			return true;
		});
	}, [allJobs, filters, skills]);

	return {
		filteredJobs,
	};
}
