import { ImageResponse } from "next/og";
import { ProfileData } from "@types";

/**
 * OG 이미지 생성을 위한 인터페이스
 * OCP(개방-폐쇄 원칙): 새로운 이미지 타입 추가 시 기존 코드 수정 없이 확장 가능
 */
interface IOgImageGenerator {
	generate(profileData: ProfileData | null): ImageResponse;
}

/**
 * 프로필 OG 이미지 생성을 담당하는 서비스 클래스
 * SRP(단일 책임 원칙): OG 이미지 생성만을 담당
 */
export class ProfileOgImageGenerator implements IOgImageGenerator {
	private static readonly IMAGE_DIMENSIONS = {
		width: 1200,
		height: 630,
	};

	private static readonly BRAND_COLORS = {
		primary: "#068372",
		secondary: "#0ea5e9",
		text: "#0e0e0e",
		lightText: "#4a5568",
		mutedText: "#718096",
		background: "#ffffff",
		backgroundGray: "#f8f9fa",
	};

	/**
	 * 프로필 데이터를 기반으로 OG 이미지를 생성합니다
	 */
	generate(profileData: ProfileData | null): ImageResponse {
		if (!profileData) {
			return this.generateErrorImage("프로필을 찾을 수 없습니다");
		}

		return new ImageResponse(
			this.renderProfileImage(profileData),
			ProfileOgImageGenerator.IMAGE_DIMENSIONS
		);
	}

	/**
	 * 에러 상황에 대한 기본 이미지를 생성합니다
	 */
	private generateErrorImage(message: string): ImageResponse {
		return new ImageResponse(
			(
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor:
							ProfileOgImageGenerator.BRAND_COLORS.backgroundGray,
						fontSize: 32,
						fontWeight: "bold",
						color: ProfileOgImageGenerator.BRAND_COLORS.text,
					}}>
					<div>품앗이</div>
					<div style={{ fontSize: 24, marginTop: 16 }}>{message}</div>
				</div>
			),
			ProfileOgImageGenerator.IMAGE_DIMENSIONS
		);
	}

	/**
	 * 프로필 이미지 JSX를 렌더링합니다
	 */
	private renderProfileImage(profileData: ProfileData) {
		const { name, field, company1, job1, company2, job2, profile_image } =
			profileData;

		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					backgroundColor: ProfileOgImageGenerator.BRAND_COLORS.background,
					position: "relative",
				}}>
				{this.renderBackgroundGradient()}
				{this.renderMainContent(profileData)}
				{this.renderBottomBranding()}
			</div>
		);
	}

	/**
	 * 배경 그래디언트를 렌더링합니다
	 */
	private renderBackgroundGradient() {
		return (
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: `linear-gradient(135deg, ${ProfileOgImageGenerator.BRAND_COLORS.primary} 0%, ${ProfileOgImageGenerator.BRAND_COLORS.secondary} 100%)`,
					opacity: 0.05,
				}}
			/>
		);
	}

	/**
	 * 메인 컨텐츠를 렌더링합니다
	 */
	private renderMainContent(profileData: ProfileData) {
		return (
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
					padding: "60px",
					alignItems: "center",
					justifyContent: "space-between",
					position: "relative",
				}}>
				{this.renderProfileInfo(profileData)}
				{this.renderProfileImageSection(profileData)}
			</div>
		);
	}

	/**
	 * 프로필 정보 섹션을 렌더링합니다
	 */
	private renderProfileInfo(profileData: ProfileData) {
		const { name, field, company1, job1, company2, job2 } = profileData;

		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					flex: 1,
					paddingRight: "40px",
				}}>
				{/* 브랜드 로고 */}
				<div
					style={{
						fontSize: 32,
						fontWeight: "bold",
						color: ProfileOgImageGenerator.BRAND_COLORS.primary,
						marginBottom: "40px",
					}}>
					품앗이 POOMASI
				</div>

				{/* 프로필 이름 */}
				<div
					style={{
						fontSize: 56,
						fontWeight: "bold",
						color: ProfileOgImageGenerator.BRAND_COLORS.text,
						marginBottom: "16px",
						lineHeight: 1.2,
					}}>
					{name}
				</div>

				{/* 전문 분야 */}
				<div
					style={{
						fontSize: 32,
						fontWeight: "700",
						color: ProfileOgImageGenerator.BRAND_COLORS.primary,
						marginBottom: "32px",
					}}>
					{field} 전문가
				</div>

				{/* 경력 정보 */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "12px",
					}}>
					{this.renderCareerInfo(company1, job1)}
					{this.renderCareerInfo(company2, job2)}
				</div>

				{/* CTA 메시지 */}
				<div
					style={{
						fontSize: 20,
						color: ProfileOgImageGenerator.BRAND_COLORS.mutedText,
						marginTop: "40px",
						fontStyle: "italic",
					}}>
					&quot;전문가에게 직접 질문해보세요!&quot;
				</div>
			</div>
		);
	}

	/**
	 * 경력 정보를 렌더링합니다
	 */
	private renderCareerInfo(company?: string, job?: string) {
		if (!company || !job) return null;

		return (
			<div
				style={{
					fontSize: 24,
					color: ProfileOgImageGenerator.BRAND_COLORS.lightText,
					display: "flex",
					gap: "12px",
				}}>
				<span style={{ fontWeight: "600" }}>{company}</span>
				<span>{job}</span>
			</div>
		);
	}

	/**
	 * 프로필 이미지 섹션을 렌더링합니다
	 */
	private renderProfileImageSection(profileData: ProfileData) {
		const { name, profile_image } = profileData;

		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
				}}>
				<div
					style={{
						width: "300px",
						height: "300px",
						borderRadius: "50%",
						overflow: "hidden",
						border: `8px solid ${ProfileOgImageGenerator.BRAND_COLORS.primary}`,
						boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
					}}>
					<img
						src={profile_image}
						alt={`${name} 프로필`}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</div>
			</div>
		);
	}

	/**
	 * 하단 브랜딩을 렌더링합니다
	 */
	private renderBottomBranding() {
		return (
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "8px",
					background: `linear-gradient(90deg, ${ProfileOgImageGenerator.BRAND_COLORS.primary} 0%, ${ProfileOgImageGenerator.BRAND_COLORS.secondary} 100%)`,
				}}
			/>
		);
	}
}
