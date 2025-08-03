"use client";

import { useMobileStore } from "@store/useMobileStore.ts";
import { useCompanyCategories } from "@hooks/jobsPage/useCompanyCategories";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";

export default function JobsPage() {
	const { isMobile } = useMobileStore();
	const { companies, loading, error, selectedCompany, handleCompanySelect } =
		useCompanyCategories();

	const handleSelect = (company: any) => {
		handleCompanySelect(company);
		// 나중에 필터링 로직 추가 예정
		console.log("선택된 회사:", company?.name || "전체");
	};

	return (
		<div className="w-full min-h-screen bg-gray-50">
			{/* 페이지 헤더 */}
			<header className="text-center py-16 px-8">
				<h1 className="sr-only text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					채용공고
				</h1>
				<p className="sr-only text-lg text-gray-600">
					다양한 기업의 채용 정보를 확인해보세요
				</p>
			</header>

			<main className="max-w-7xl mx-auto px-4 pb-16">
				{/* 회사별 카테고리 섹션 */}
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<h2 className="sr-only text-2xl font-semibold text-gray-800 mb-4 text-center">
						회사별 채용공고
					</h2>

					{error ? (
						<div className="text-center py-8">
							<div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4">
								{error}
							</div>
						</div>
					) : (
						<CompanyNavList
							companies={companies}
							selectedCompany={selectedCompany}
							onCompanySelect={handleSelect}
							loading={loading}
						/>
					)}
				</section>
<<<<<<< HEAD
=======

				{/* 임시 선택된 회사 표시 */}
				{selectedCompany && (
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
						<p className="text-blue-800">
							선택된 회사: <strong>{selectedCompany.name}</strong>
						</p>
					</div>
				)}
>>>>>>> b0032f17 (chore: 컴포넌트명 변경)
			</main>
		</div>
	);
}
