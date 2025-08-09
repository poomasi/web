import { RecruitmentFilters } from "@types";
import { useJobsQuery } from "@hooks/queries/useJobsQuery";

// React Query 버전 - 서버 상태 관리 전용
export function useJobs(filters?: RecruitmentFilters) {
	const {
		data: jobs = [],
		isLoading,
		error,
		refetch,
		isError,
	} = useJobsQuery(filters);

	const errorMessage =
		isError && error
			? error instanceof Error
				? error.message
				: "채용공고를 불러오는데 실패했습니다."
			: null;

	return {
		jobs,
		loading: isLoading,
		error: errorMessage,
		refetch,
		// 필터 적용은 이제 queryKey 변경으로 자동 처리됨
		applyFilters: (newFilters?: RecruitmentFilters) => {
			console.log("새로운 필터 적용:", newFilters);
		},
	};
}
