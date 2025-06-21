"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import KakaoLoginCallback from "@utils/kakao-login/kakao-login-callback.tsx";

export default function LoginPage() {
	// KakaoLoginCallback();

	return (
		<>
			<KakaoLoginCallback />
			<LoadingContainer>
				<Spinner />
				<LoadingText>로그인 중입니다.. 잠시만 기다려주세요</LoadingText>
			</LoadingContainer>
		</>
	);
}

// 스피너 회전 애니메이션 정의
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 스피너 컨테이너
const LoadingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 70vh;
	gap: 50px;
	@media (max-width: 1024px) {
		height: 18.75rem;
		gap: 1.875rem;
	}
`;

// 스피너 스타일
const Spinner = styled.div`
	width: 100px;
	height: 100px;
	border: 4px solid rgba(6, 131, 114, 0.3);
	border-radius: 50%;
	border-top-color: #068372;
	animation: ${spinAnimation} 1s ease-in-out infinite;
	@media (max-width: 1024px) {
		width: 1.875rem;
		height: 1.875rem;
	}
`;

// 로딩 텍스트 스타일
const LoadingText = styled.div`
	color: #0e0e0e;
	font-size: 40px;
	font-weight: 500;
	@media (max-width: 1024px) {
		font-size: 20px;
	}
`;
