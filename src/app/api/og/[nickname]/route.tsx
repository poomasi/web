import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { ProfileService } from "../../../../services/ProfileService";
import { ProfileOgImageGenerator } from "../../../../services/OgImageGeneratorService";

export const runtime = "edge";

export async function GET(
	request: NextRequest,
	{ params }: { params: { nickname: string } }
) {
	try {
		// ProfileService를 사용하여 프로필 데이터 조회
		const profileData = await ProfileService.getProfileByNickname(
			params.nickname
		);

		// ProfileOgImageGenerator를 사용하여 이미지 생성
		const imageGenerator = new ProfileOgImageGenerator();
		return imageGenerator.generate(profileData);
	} catch (error) {
		console.error("OG 이미지 생성 중 오류:", error);

		// 에러 발생 시 기본 이미지 반환
		const imageGenerator = new ProfileOgImageGenerator();
		return imageGenerator.generate(null);
	}
}
