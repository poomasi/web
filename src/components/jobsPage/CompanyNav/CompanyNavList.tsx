import { CompanyNav } from "./CompanyNav";
import { CompanyParentResponse } from "@types";

interface CompanyCategoryListProps {
	companies: CompanyParentResponse[];
	selectedCompany: CompanyParentResponse | null;
	onCompanySelect: (company: CompanyParentResponse | null) => void;
	loading?: boolean;
	// 각 회사별 새 채용공고 여부를 확인하는 함수 (나중에 구현)
	getHasNewJobs?: (companyId: string) => boolean;
}

// SRP: 회사 카테고리 목록 관리만 담당
export function CompanyNavList({
	companies,
	selectedCompany,
	onCompanySelect,
	loading,
	getHasNewJobs,
}: CompanyCategoryListProps) {
	if (loading) {
		return (
			<section
				className="flex justify-center py-12"
				aria-label="회사 목록 로딩">
				<p className="text-gray-500">회사 목록을 불러오는 중...</p>
			</section>
		);
	}

	return (
		<section
			className="w-full px-4"
			aria-label="네카쿠배라 채용공고 필터">
			<h3 className="sr-only">네카쿠배라 채용공고 필터 목록</h3>

			<nav
				className="flex items-center gap-[46px] py-6 overflow-x-auto scrollbar-hide"
				role="tablist"
				aria-label="회사 선택 탭">
				{/* 전체 선택 버튼 */}
				<button
					onClick={() => onCompanySelect(null)}
					className={`
						flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer 
						transition-all duration-200 hover:scale-110
						${selectedCompany === null ? "opacity-100" : "opacity-70"}
					`}
					role="tab"
					aria-selected={selectedCompany === null}
					aria-label="모든 회사 채용공고 보기">
					<div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center shadow-sm">
						<span className="text-gray-600 text-lg font-bold">전체</span>
					</div>
					<span className="text-xs font-medium text-gray-700 text-center">
						전체
					</span>
				</button>

				{/* 각 회사별 버튼들 */}
				{companies.map((company) => (
					<CompanyNav
						key={company.public_id}
						company={company}
						isSelected={selectedCompany?.public_id === company.public_id}
						onClick={onCompanySelect}
						hasNewJobs={getHasNewJobs?.(company.public_id) || false}
					/>
				))}
			</nav>
		</section>
	);
}
