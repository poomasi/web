import { ProfileData } from "@types";

/**
 * 프로필 데이터 관리를 담당하는 서비스 클래스
 * SRP(단일 책임 원칙): 프로필 데이터 조회만을 담당
 */
export class ProfileService {
	private static readonly API_BASE_URL = "https://api.poomasi.kr/api/v1";

	/**
	 * nickname으로 프로필 데이터를 조회합니다
	 * @param nickname 조회할 사용자의 닉네임
	 * @returns 프로필 데이터 또는 null
	 */
	static async getProfileByNickname(
		nickname: string
	): Promise<ProfileData | null> {
		try {
			const response = await fetch(
				`${this.API_BASE_URL}/accounts/${nickname}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					cache: "no-store",
				}
			);

			if (!response.ok) {
				return null;
			}

			const data = await response.json();
			return this.validateProfileData(data.data);
		} catch (error) {
			console.error("프로필 데이터 조회 실패:", error);
			return null;
		}
	}

	/**
	 * 프로필 데이터 유효성 검증
	 * @param data 검증할 데이터
	 * @returns 유효한 프로필 데이터 또는 null
	 */
	private static validateProfileData(data: any): ProfileData | null {
		if (!data || typeof data !== "object") {
			return null;
		}

		const requiredFields = ["nickname", "name", "field"];
		const hasRequiredFields = requiredFields.every(
			(field) => data[field] && typeof data[field] === "string"
		);

		if (!hasRequiredFields) {
			return null;
		}

		return {
			nickname: data.nickname,
			profile_image: data.profile_image || "",
			name: data.name,
			field: data.field,
			company1: data.company1 || "",
			job1: data.job1 || "",
			company2: data.company2 || "",
			job2: data.job2 || "",
			is_vacation: Boolean(data.is_vacation),
		};
	}
}
