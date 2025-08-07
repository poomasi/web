"use client";

import { useCompanyCategories } from "@hooks/jobsPage/useCompanyCategories";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { CompanyParentResponse } from "../../types/company.types";

// SRP: Jobs 페이지의 UI 렌더링만 담당
export default function JobsPage() {
	const { companies, loading, error, selectedCompany, handleCompanySelect } =
		useCompanyCategories();

	// SRP: 회사 선택 로직을 분리하여 단일 책임 원칙 적용
	const handleCompanySelection = (company: CompanyParentResponse | null) => {
		handleCompanySelect(company);
		// TODO: 추후 채용공고 필터링 로직 추가 예정
		console.log("선택된 회사:", company?.name || "전체");
	};

	// OCP: 에러 처리 컴포넌트를 분리하여 확장에 열려있도록 구성
	const renderErrorState = () => (
		<div className="text-center py-8">
			<div
				className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4"
				role="alert"
				aria-live="polite">
				{error}
			</div>
		</div>
	);

	// OCP: 컨텐츠 영역을 분리하여 확장 가능하도록 구성
	const renderContent = () => {
		if (error) {
			return renderErrorState();
		}

		return (
			<CompanyNavList
				companies={companies}
				selectedCompany={selectedCompany}
				onCompanySelect={handleCompanySelection}
				loading={loading}
			/>
		);
	};

	return (
		<main className="max-w-7xl mx-auto px-4 pb-16">
			{/* 회사별 카테고리 섹션 */}
			<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
				{renderContent()}
			</section>
		</main>
	);
}
