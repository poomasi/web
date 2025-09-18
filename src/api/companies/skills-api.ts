import customAxios from "../customAxios";
import { SkillResponse } from "../types/skill.types";

const PATH = "v1/capability/skills";

// 기술 스택 API 호출
export const SkillsApi = {
	// 기술 스택 목록 조회 - PositionsApi와 동일한 패턴으로 수정
	getSkills: async (): Promise<SkillResponse[]> => {
		try {
			console.log("Skills API 호출 시작:", PATH);
			const response = await customAxios.get<SkillResponse[]>(PATH);
			console.log("Skills API 응답:", response);

			// 인터셉터에서 이미 response.data를 반환하므로 response 자체가 data입니다
			return response;
		} catch (error) {
			console.error("Skills API 에러:", error);
			throw new Error("기술 스택 목록을 불러오는데 실패했습니다.");
		}
	},
};
