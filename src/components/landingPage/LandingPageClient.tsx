// src/app/LandingPageClient.tsx
"use client";

import dynamic from "next/dynamic";
import styled from "@emotion/styled";

import TitleSection from "@components/landingPage/web/TitleSection";
import { PoomCounter } from "@components/landingPage/web/PoomCounter";
import { ProfilesSection } from "@components/landingPage/web/ProfilesSection";
import MobileLandingWrapper from "@components/landingPage/MobileLandingWrapper";

const IntroduceSection = dynamic(
	() => import("@components/landingPage/web/IntroduceSection"),
	{ ssr: false }
);

// 타입 정의
interface PoomCount {
	account_count: number;
	post_count: number;
}

export default function LandingPageClient({
	accountList,
	poomCount,
}: {
	accountList: any[];
	poomCount: PoomCount;
}) {
	return (
		<>
			<MobileLandingWrapper />
			<PageContainer>
				<TitleSection />
				<IntroduceSection />
				<PoomCounter poomCount={poomCount} />
				<ProfilesSection accountList={accountList} />
			</PageContainer>
		</>
	);
}

const PageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 60px;
`;
