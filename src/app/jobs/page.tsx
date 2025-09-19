"use client";

import React, { useMemo } from "react";
import { useCompanyCategories } from "@hooks/jobsPage/useCompanyCategories";
import { CompanyNavList } from "@components/jobsPage/CompanyNav/CompanyNavList";
import { JobList } from "@components/jobsPage/JobList";
import {
	BasicFilter,
	FilterButtonsRow,
	FilterModal,
} from "@components/jobsPage/Filter";
import { useFilterStore } from "@store/filters"; // 1단계: 새로 만든 통합 스토어
import { useJobsQuery } from "@queries/useJobsQuery"; // 2단계: 쿼리 훅 직접 사용
import { RecruitmentResponse } from "@api/types/job.types";

export default function JobsPage() {
	// --- 데이터 로딩 (Hooks) ---

	// 1. 통합 Zustand 스토어에서 '선택된 필터'와 '액션' 가져오기
	const { selectedFilters, setFilters, clearAllFilters } = useFilterStore();

	// 2. 회사 카테고리 데이터 가져오기
	const {
		companies,
		loading: companiesLoading,
		error: companiesError,
		selectedCompany,
		handleCompanySelect,
	} = useCompanyCategories();

	// 3. '선택된 필터'를 React Query 훅에 직접 전달하여 화면에 보여줄 채용 공고를 가져오기
	const {
		data: filteredJobs = [],
		isLoading: jobsLoading,
		error: jobsError,
		refetch,
	} = useJobsQuery(selectedFilters);

	// 4. (3단계 전략) '경력/위치' 등 필터 옵션 생성을 위해, 필터 없이 모든 공고를 가져옵니다.
	const { data: allJobsForOptions = [] } = useJobsQuery({});

	// --- 데이터 가공 (Memoization) ---

	// 5. 'useMemo'를 사용해 '경력', '위치', '회사' 옵션 목록을 효율적으로 계산합니다.
	const filterOptions = useMemo(() => {
		const experienceSet = new Set<string>(["전체"]);
		const locationSet = new Set<string>(["전체"]);
		const companyNameSet = new Set<string>(["전체"]);

		allJobsForOptions.forEach((job) => {
			if (job.experience_years) experienceSet.add(job.experience_years);
			if (job.company_address_depth1)
				locationSet.add(job.company_address_depth1);
			if (job.parent_company_name) companyNameSet.add(job.parent_company_name);
		});

		return {
			experienceOptions: Array.from(experienceSet).sort(),
			locationOptions: Array.from(locationSet).sort(),
			companyNameOptions: Array.from(companyNameSet).sort(),
		};
	}, [allJobsForOptions]); // allJobsForOptions 데이터가 준비되었을 때만 재계산됩니다.

	// --- 이벤트 핸들러 ---

	const handleJobClick = (job: RecruitmentResponse) => {
		console.log("선택된 채용공고:", job.title);
	};

	// --- UI 렌더링 ---

	return (
		<main className="max-w-7xl mx-auto px-4 pb-16">
			<section className="bg-white rounded-lg shadow-sm p-6 mb-8">
				<CompanyNavList
					companies={companies}
					selectedCompany={selectedCompany}
					onCompanySelect={handleCompanySelect}
					loading={companiesLoading}
				/>
			</section>

			<section className="bg-white rounded-lg shadow-sm p-6">
				<div className="mb-6">
					<p className="text-gray-600">
						"네카쿠배라당토 기업들의 최신 채용공고를 확인해보세요."
					</p>
				</div>

				<div className="py-6 space-y-6">
					<BasicFilter />
					<FilterButtonsRow
						totalJobsCount={filteredJobs.length}
						onResetFilters={clearAllFilters} // 스토어의 액션을 직접 연결
					/>
				</div>

				<JobList
					jobs={filteredJobs}
					loading={jobsLoading}
					error={jobsError ? "채용공고를 불러오는데 실패했습니다." : null}
					onJobClick={handleJobClick}
				/>
			</section>

			{/* 필터 모달 */}
			<FilterModal
				options={filterOptions}
				currentFilters={selectedFilters}
				onApplyFilters={setFilters}
			/>
		</main>
	);
}
