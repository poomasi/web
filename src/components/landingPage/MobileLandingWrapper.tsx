"use client";

import { useMobileStore } from "@store/useMobileStore";
import { MobileLandingPage } from "@components/landingPage/mobile/MobileLandingPage";

export default function MobileLandingWrapper() {
	const { isMobile } = useMobileStore();
	return isMobile ? <MobileLandingPage /> : null;
}
