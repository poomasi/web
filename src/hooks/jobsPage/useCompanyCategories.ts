"use client";

import { useEffect, useState } from "react";
import { CompanyParentResponse } from "../../types/company.types";
import { RequestApi } from "@api/request-api";

// SRP: 모회사 카테고리 관련 로직만 담당
export function useCompanyCategories() {
	const [companies, setCompanies] = useState<CompanyParentResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCompany, setSelectedCompany] =
		useState<CompanyParentResponse | null>(null);

	const fetchCompanies = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await RequestApi.companies.getParentCompanies();
			setCompanies(response.data || []);
		} catch (err) {
			console.error("모회사 목록 로드 중 오류 발생:", err);
			setError("회사 목록을 불러오는데 실패했습니다.");
			setCompanies([]);
		} finally {
			setLoading(false);
		}
	};

	const handleCompanySelect = (company: CompanyParentResponse | null) => {
		setSelectedCompany(company);
	};

	useEffect(() => {
		fetchCompanies();
	}, []);

	return {
		companies,
		loading,
		error,
		selectedCompany,
		handleCompanySelect,
		refetch: fetchCompanies,
	};
}
