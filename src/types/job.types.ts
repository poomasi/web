// 채용공고 스킬 타입
export interface JobSkill {
	skill_id: number;
	skill_name: string;
	skill_logo: string;
}

// 채용공고 응답 타입 (API 문서 기준)
export interface RecruitmentResponse {
	title: string;
	link: string;
	recruitment_id: number;
	public_id: string;
	company_id: number;
	contents: string;
	experience_years: string;
	position_id: string;
	is_closed: boolean;
	posted_date: string;
	created_at: string;
	updated_at: string;
	skills: JobSkill[];
}

// API 응답 래퍼 타입
export interface RecruitmentApiResponse {
	status_code: number;
	message: string;
	data: RecruitmentResponse[];
}

// 경력 필터 타입
export type ExperienceLevel = "인턴" | "주니어" | "시니어";

// 채용공고 필터 파라미터 타입
export interface RecruitmentFilters {
	skill_ids?: number[];
	experience_years?: ExperienceLevel[];
}
