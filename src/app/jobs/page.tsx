"use client";

import { useCompanyCategories } from "@hooks/jobsPage/useCompanyCategories";
import { useJobsWithFilters } from "@hooks/jobsPage/useJobsWithFilters";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { JobList } from "@components/jobsPage/jobList";
import {
	BasicFilter,
	FilterButtonsRow,
} from "@components/jobsPage/filterButtons";
import { usePositionsStore } from "@store/positions";
import { RecruitmentResponse } from "@api/types/job.types";
import { CompanyParentResponse } from "@api/types/company.types";
import { useEffect } from "react";

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

	const { selectedPositions } = usePositionsStore();

	// zustand 스토어의 선택된 포지션을 필터에 동기화
	useEffect(() => {
		updateFilters({ position_titles: selectedPositions });
	}, [selectedPositions, updateFilters]);

	const handleRefresh = () => {
		refetch();
	};

	const handleClearFilters = () => {
		clearFilters();
	};

	const handleResetAllFilters = () => {
		// 기존 필터 초기화
		clearFilters();
		// 포지션 스토어 초기화 후 Web Frontend로 재설정
		const { clearSelectedPositions, initializeWithWebFrontend } =
			usePositionsStore.getState();
		clearSelectedPositions();
		initializeWithWebFrontend();
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
				onCompanySelect={handleCompanySelect}
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

				{/* 기본 필터 UI */}
				<div className="py-6 space-y-6">
					<BasicFilter />
					<FilterButtonsRow
						totalJobsCount={filteredJobs.length}
						onResetFilters={handleResetAllFilters}
					/>
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
