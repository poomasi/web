"use client";

import { useRouter } from "next/navigation";
import { ProfileData } from "@types";
import { useState } from "react";
import { useAccountStore } from "@store/account";
import { useMobileStore } from "@store/useMobileStore";

export function useProfileCard() {
	const router = useRouter();
	const { accessToken } = useAccountStore((state) => state);
	const isMobile = useMobileStore((state) => state.isMobile);

	// const [useGuideModal, setUseGuideModal] = useState(false); //모달띄울지말지 결정
	const [selectedCardKey, setSelectedCardKey] = useState<
		"WebInstructions" | "MobileInstructions" | null
	>(null);

	const handleProfileClick = (profile: ProfileData) => {
		if (accessToken === null && isMobile) {
			// setUseGuideModal(true);
			setSelectedCardKey("MobileInstructions");
			return;
		}
		if (accessToken === null && !isMobile) {
			setSelectedCardKey("WebInstructions");
			return;
		}

		if (accessToken !== null) {
			//질문페이지 이동 시작 시간 저장
			localStorage.setItem("switchQnaPage_start_time", String(Date.now()));
			router.push(`/${profile.nickname}`);
		}
	};

	return {
		handleProfileClick,
		// useGuideModal,
		// setUseGuideModal,
		selectedCardKey,
		setSelectedCardKey,
	};
}
