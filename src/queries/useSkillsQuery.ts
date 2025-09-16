import { useQuery } from "@tanstack/react-query";
import { SkillsApi } from "@api/skills";
import { SkillResponse } from "@api/types/skill.types";
import {
	POPULAR_SKILLS_CONFIG,
	PopularSkillData,
	PopularSkillConfig,
} from "@constants/popularSkills";

export function useSkillsQuery() {
	return useQuery<SkillResponse[]>({
		queryKey: ["skills"],
		queryFn: async () => {
			const skillsData = await SkillsApi.getSkills();
			return skillsData;
		},
		staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
		gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
		refetchOnWindowFocus: false,
	});
}

export function usePopularSkillsQuery() {
	const { data: skills = [], ...rest } = useSkillsQuery();

	const popularSkills: PopularSkillData[] = [];

	if (skills.length > 0) {
		POPULAR_SKILLS_CONFIG.forEach((config: PopularSkillConfig) => {
			const matchedSkill = skills.find((skill) =>
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
					logo_url: matchedSkill.logo_url,
				});
			}
		});
	}

	return {
		data: popularSkills,
		...rest,
	};
}
