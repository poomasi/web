import customAxios from "@api/customAxios.ts";
import { CompanyParentResponse } from "@api/types/company.types";

const PATH = "v1/companies";

export const CompaniesApi = {
	// 모회사 목록 조회 (동그라미 이미지용)
	getParentCompanies: async (): Promise<CompanyParentResponse[]> => {
		return await customAxios.get<CompanyParentResponse[]>(`${PATH}/parent`);
	},
};
