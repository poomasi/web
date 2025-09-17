export { useFilterStore } from "./filters-store";
export type { FilterState, FilterActions, FilterStore } from "./types";
import { RecruitmentResponse } from "@api/types";

export const createDataActions = (set: any, get: () => any) => ({
	// set: 상태 업데이트 할 때 사용.
	// get: 현재 상태 가져올 때 사용.

	extractFilterOptions: (jobs: RecruitmentResponse[]) => {
		/* Set(집합) 이라는 특별한 자료구조를 사용하는 이유
		- "고유한 목록"을 얻고 싶을 때 배열 대신 Set을 씀
		- 중복 제거 자동으로 해줌
		
		1. jobs 배열을 돌면서 옵션을 뽑을 때, 같은 값이 여러 번 나올 수 있다. (전체", "신입", "신입", "3~5년"] 이렇게)
		2. Set을 쓰면 → ["전체", "신입", "3~5년"] 이렇게 자동으로 중복 제거됨.
	
		*/
		const parent_company_name_Set = new Set<string>();
		parent_company_name_Set.add("전체");
		jobs.forEach((job) => {
			if (job.company_address_depth1) {
				parent_company_name_Set.add(job.parent_company_name);
			}
		});

		const experienceSet = new Set<string>();
		experienceSet.add("전체");
		jobs.forEach((job) => {
			if (job.experience_years) {
				experienceSet.add(job.experience_years);
			}
		});

		const locationSet = new Set<string>();
		locationSet.add("전체");
		jobs.forEach((job) => {
			if (job.company_address_depth1) {
				locationSet.add(job.company_address_depth1);
			}
		});

		set({
			//Set을 배열로 변환 -> 문자열 기준으로 정렬
			parent_company_name_Options: Array.from(parent_company_name_Set).sort(),
			experienceOptions: Array.from(experienceSet).sort(),
			locationOptions: Array.from(locationSet).sort(),
		});
	},
});
