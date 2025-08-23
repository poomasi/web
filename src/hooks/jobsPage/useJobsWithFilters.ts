import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
	RecruitmentResponse,
	RecruitmentFilters,
	JobSkill,
} from "@api/types/job.types";
import { useJobs } from "./useJobs";
import { useFilterStore } from "@store/filters";

interface UseJobsWithFiltersReturn {
	allJobs: RecruitmentResponse[];
	filteredJobs: RecruitmentResponse[];
	loading: boolean;
	error: string | null;
	filters: RecruitmentFilters;
	updateFilters: (newFilters: Partial<RecruitmentFilters>) => void;
	clearFilters: () => void;
	refetch: () => void;
}

export function useJobsWithFilters(): UseJobsWithFiltersReturn {
	const [filters, setFilters] = useState<RecruitmentFilters>({});

	const { jobs: allJobs, loading, error, refetch } = useJobs();
	const { skills } = useFilterStore();

	// 최초 1회: 데이터의 skill_name 기반으로 "프론트엔드/Frontend" 스킬을 찾아 기본 필터 적용
	const didSetDefaultSkill = useRef(false);
	useEffect(() => {
		if (didSetDefaultSkill.current) return;
		if (allJobs.length === 0) return;

		const frontSkillId = findFrontendSkillId(allJobs);
		const hasNoActiveFilter =
			(!filters.skill_ids || filters.skill_ids.length === 0) &&
			(!filters.position_titles || filters.position_titles.length === 0) &&
			(!filters.experience_years || filters.experience_years.length === 0);

		if (frontSkillId !== null && hasNoActiveFilter) {
			setFilters((prev) => ({ ...prev, skill_ids: [frontSkillId] }));
			didSetDefaultSkill.current = true;
		}
	}, [allJobs]);

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

	const updateFilters = useCallback(
		(newFilters: Partial<RecruitmentFilters>) => {
			setFilters((prev) => ({ ...prev, ...newFilters }));
		},
		[]
	);

	const clearFilters = useCallback(() => {
		setFilters({});
		// 기본값 다시 적용 가능하도록 플래그 리셋
		didSetDefaultSkill.current = false;
	}, []);

	return {
		allJobs,
		filteredJobs,
		loading,
		error,
		filters,
		updateFilters,
		clearFilters,
		refetch,
	};
}

function findFrontendSkillId(jobs: RecruitmentResponse[]): number | null {
	// 전체 스킬 풀에서 프론트엔드 후보 탐색
	const candidates = flattenSkills(jobs);
	const target = candidates.find((s) => isFrontendSkillName(s.skill_name));
	return target ? target.skill_id : null;
}

function flattenSkills(jobs: RecruitmentResponse[]): JobSkill[] {
	const map = new Map<number, JobSkill>();
	for (const job of jobs) {
		for (const skill of job.skills) {
			if (!map.has(skill.skill_id)) {
				map.set(skill.skill_id, skill);
			}
		}
	}
	return Array.from(map.values());
}

function isFrontendSkillName(name: string): boolean {
	const lowered = name.toLowerCase();
	return (
		lowered === "frontend" ||
		lowered === "front-end" ||
		lowered === "front end" ||
		lowered.includes("프론트엔드") ||
		lowered === "fe"
	);
}
