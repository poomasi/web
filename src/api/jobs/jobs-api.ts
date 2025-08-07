import customAxios from "../customAxios";
import { RecruitmentApiResponse, RecruitmentFilters } from "@types";

const PATH = "/api/v1/companies-recruitments";

// 채용공고 API 호출
export const JobsApi = {
	// 채용공고 목록 조회 (필터 옵션 포함)
	getRecruitments: async (
		filters?: RecruitmentFilters
	): Promise<RecruitmentApiResponse> => {
		try {
			const params = new URLSearchParams();

			// 스킬 ID 필터 적용
			if (filters?.skill_ids && filters.skill_ids.length > 0) {
				filters.skill_ids.forEach((id) => {
					params.append("skill_ids", id.toString());
				});
			}

			// 경력 필터 적용
			if (filters?.experience_years && filters.experience_years.length > 0) {
				filters.experience_years.forEach((experience) => {
					params.append("experience_years", experience);
				});
			}

			const queryString = params.toString();
			const url = queryString ? `${PATH}?${queryString}` : PATH;
			//?는 URL 쿼리 문자열의 시작 기호

			const response = await customAxios.get<RecruitmentApiResponse>(url);
			return response.data;
		} catch (error) {
			console.error("채용공고 조회 실패:", error);
			throw new Error("채용공고를 불러오는데 실패했습니다.");
		}
	},
};

// 편의 함수들
export const getRecruitments = (filters?: RecruitmentFilters) =>
	JobsApi.getRecruitments(filters);
