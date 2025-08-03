import { QnaPageProvider } from "@qnaPage/QnaPageProvider.tsx";
import { Metadata } from "next";
import { ProfileService } from "../../services/ProfileService";

/**
 * nickname 기반 동적 메타데이터 생성
 * SRP(단일 책임 원칙): 메타데이터 생성만을 담당
 */
export async function generateMetadata({
	params,
}: {
	params: { nickname: string };
}): Promise<Metadata> {
	try {
		const profileData = await ProfileService.getProfileByNickname(
			params.nickname
		);

		if (!profileData) {
			return {
				title: "프로필을 찾을 수 없습니다 | 품앗이",
				description: "요청하신 프로필을 찾을 수 없습니다.",
			};
		}

		const { name, field, company1, job1, nickname } = profileData;
		const baseUrl = "https://www.poomasi.kr";

		// OG 이미지 URL 생성
		const ogImageUrl = `${baseUrl}/api/og/${nickname}`;

		// 직업 정보 포맷팅
		const jobInfo = company1 && job1 ? `現 ${company1} ${job1}` : "";
		const description = jobInfo
			? `${field} 전문가 | ${jobInfo} | 품앗이에서 직접 질문해보세요!`
			: `${field} 전문가 | 품앗이에서 직접 질문해보세요!`;

		return {
			title: `${name} - ${field} 전문가 | 품앗이`,
			description,
			keywords: [name, field, "전문가", "질문", "상담", "품앗이", "POOMASI"],
			authors: [{ name: "품앗이 POOMASI" }],
			openGraph: {
				title: `${name} - ${field} 전문가`,
				description,
				url: `${baseUrl}/${nickname}`,
				siteName: "품앗이 POOMASI",
				images: [
					{
						url: ogImageUrl,
						width: 1200,
						height: 630,
						alt: `${name} - ${field} 전문가 프로필`,
					},
				],
				locale: "ko_KR",
				type: "profile",
			},
			twitter: {
				card: "summary_large_image",
				title: `${name} - ${field} 전문가`,
				description,
				images: [ogImageUrl],
			},
			robots: {
				index: true,
				follow: true,
				googleBot: {
					index: true,
					follow: true,
					"max-video-preview": -1,
					"max-image-preview": "large",
					"max-snippet": -1,
				},
			},
		};
	} catch (error) {
		console.error("메타데이터 생성 중 오류:", error);

		return {
			title: "품앗이 | 전문가에게 직접 질문하세요",
			description: "다양한 분야의 전문가들과 소통할 수 있는 플랫폼입니다.",
		};
	}
}

function QnaLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<QnaPageProvider>{children}</QnaPageProvider>
		</>
	);
}

export default QnaLayout;
