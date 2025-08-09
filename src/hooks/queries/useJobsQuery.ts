import { useQuery } from "@tanstack/react-query";
import { JobsApi } from "@api/jobs";
import { RecruitmentResponse, RecruitmentFilters } from "@types";

export function useJobsQuery(filters?: RecruitmentFilters) {
	return useQuery<RecruitmentResponse[]>({
		queryKey: ["jobs", filters],
		queryFn: () => JobsApi.getRecruitments(filters),
		staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
		gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
		refetchOnWindowFocus: false,
		retry: 1,
	});
}
