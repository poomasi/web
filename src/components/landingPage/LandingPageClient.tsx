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

export default function LandingPageClient() {
	return (
		<>
			<MobileLandingWrapper />
			<PageContainer>
				<TitleSection />
				<IntroduceSection />
				<PoomCounter />
				<ProfilesSection />
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
