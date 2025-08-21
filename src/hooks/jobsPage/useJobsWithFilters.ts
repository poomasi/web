import { useMemo, useState, useEffect, useRef } from "react";
import { RecruitmentResponse, RecruitmentFilters, JobSkill } from "@types";
import { useJobs } from "./useJobs";

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
				const hasMatchingSkill = job.skills.some((skill) =>
					filters.skill_ids!.includes(skill.skill_id)
				);
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

			return true;
		});
	}, [allJobs, filters]);

	const updateFilters = (newFilters: Partial<RecruitmentFilters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const clearFilters = () => {
		setFilters({});
		// 기본값 다시 적용 가능하도록 플래그 리셋
		didSetDefaultSkill.current = false;
	};

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
