"use client";

import { useParams } from "next/navigation";
import { useParentCompaniesQuery } from "@queries/useParentCompaniesQuery";
import { CompanyInfo } from "@components/jobsPage/CompanyInfo";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { useMemo } from "react";

export default function CompanyJobsPage() {
	const params = useParams();
	const companyName = params?.companyName as string;

	const {
		data: companies = [],
		isLoading: companiesLoading,
		error: companiesError,
	} = useParentCompaniesQuery();

	// URL 파라미터에서 받은 회사 영어 이름으로 회사 정보 찾기
	const selectedCompany = useMemo(() => {
		if (!companyName || !companies.length) return null;

		return (
			companies.find((company) => company.english_name === companyName) || null
		);
	}, [companyName, companies]);

	const renderErrorState = () => (
		<div className="text-center py-8">
			<div
				className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4"
				role="alert"
				aria-live="polite">
				{companiesError
					? companiesError instanceof Error
						? companiesError.message
						: "회사 목록을 불러오는데 실패했습니다."
					: "회사를 찾을 수 없습니다."}
			</div>
		</div>
	);

	// 선택된 회사가 없고 로딩이 완료된 경우 에러 처리
	if (!companiesLoading && !selectedCompany && companyName) {
		return (
			<main className="max-w-7xl mx-auto px-4 pb-16">
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<CompanyNavList
						companies={companies}
						selectedCompany={null}
						onCompanySelect={() => {}}
						loading={false}
					/>
				</section>
				<section className="bg-white rounded-lg shadow-sm p-6">
					{renderErrorState()}
				</section>
			</main>
		);
	}

	if (companiesError) {
		return (
			<main className="max-w-7xl mx-auto px-4 pb-16">
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<CompanyNavList
						companies={companies}
						selectedCompany={null}
						onCompanySelect={() => {}}
						loading={false}
					/>
				</section>
				<section className="bg-white rounded-lg shadow-sm p-6">
					{renderErrorState()}
				</section>
			</main>
		);
	}

	return (
		<main className="max-w-7xl mx-auto px-4 pb-16">
			<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
				<CompanyNavList
					companies={companies}
					selectedCompany={selectedCompany}
					onCompanySelect={() => {}}
					loading={companiesLoading}
				/>
			</section>

			{/* 선택된 회사 정보 표시 */}
			{selectedCompany && (
				<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<CompanyInfo company={selectedCompany} />
				</section>
			)}

			{selectedCompany && (
				<section className="bg-white rounded-lg shadow-sm p-6">
					<div className="mb-6">
						<h2 className="text-xl font-bold text-gray-900 mb-4">
							채용중인 공고 탐색하기
						</h2>
					</div>
				</section>
			)}
		</main>
	);
}
