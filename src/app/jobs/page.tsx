"use client";

import { useCompanyCategories } from "@hooks/jobsPage/useCompanyCategories";
import { useJobsWithFilters } from "@hooks/jobsPage/useJobsWithFilters";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { JobList } from "@components/jobsPage/jobList";
import { PositionFilter } from "@components/jobsPage/filterButtons/PositionFilter";
import { CompanyParentResponse, RecruitmentResponse } from "@types";

export default function JobsPage() {
	const {
		companies,
		loading: companiesLoading,
		error: companiesError,
		selectedCompany,
		handleCompanySelect,
	} = useCompanyCategories();

	const {
		allJobs,
		filteredJobs,
		loading: jobsLoading,
		error: jobsError,
		filters,
		updateFilters,
		clearFilters,
		refetch,
	} = useJobsWithFilters();

	const handleCompanySelection = (company: CompanyParentResponse | null) => {
		handleCompanySelect(company);
		console.log("선택된 회사:", company?.name || "전체");
	};

	const handlePositionChange = (positions: string[]) => {
		updateFilters({ position_titles: positions });
	};

	const handleRefresh = () => {
		refetch();
	};

	const handleClearFilters = () => {
		clearFilters();
	};

	const handleJobClick = (job: RecruitmentResponse) => {
		console.log("선택된 채용공고:", job.title);
	};

	const renderErrorState = () => (
		<div className="text-center py-8">
			<div
				className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-4"
				role="alert"
				aria-live="polite">
				{companiesError}
			</div>
		</div>
	);

	const renderCompanyNav = () => {
		if (companiesError) {
			return renderErrorState();
		}

		return (
			<CompanyNavList
				companies={companies}
				selectedCompany={selectedCompany}
				onCompanySelect={handleCompanySelection}
				loading={companiesLoading}
			/>
		);
	};

	return (
		<main className="max-w-7xl mx-auto px-4 pb-16">
			<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
				{renderCompanyNav()}
			</section>

			<section className="bg-white rounded-lg shadow-sm p-6">
				<div className="mb-6">
					<p className="text-gray-600">
						"네카쿠배라당토 기업들의 최신 채용공고를 확인해보세요."
					</p>
				</div>

				{/* 필터 UI */}
				<div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
					<PositionFilter
						jobs={allJobs}
						selectedPositions={filters.position_titles || []}
						onPositionChange={handlePositionChange}
					/>

					{filters.position_titles && filters.position_titles.length > 0 && (
						<button
							onClick={handleClearFilters}
							className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
							aria-label="모든 필터 초기화">
							필터 초기화
						</button>
					)}

					{filters.position_titles && filters.position_titles.length > 0 && (
						<div className="ml-auto text-sm text-gray-600">
							{filteredJobs.length}개 공고 필터링됨 (총 {allJobs.length}개 중)
						</div>
					)}
				</div>

				<JobList
					jobs={filteredJobs}
					loading={jobsLoading}
					error={jobsError}
					onJobClick={handleJobClick}
				/>
			</section>
		</main>
	);
}
