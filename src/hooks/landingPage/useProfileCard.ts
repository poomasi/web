"use client";

import { useRouter } from "next/navigation";
import { ProfileData } from "@types/ProfileData";
import { useState } from "react";
import { useAccountStore } from "@store/account";

export function useProfileCard() {
	const router = useRouter();
	const { accessToken } = useAccountStore((state) => state);
	const [useGuideModal, setUseGuideModal] = useState(false); //모달띄울지말지 결정
	const [selectedCardKey, setSelectedCardKey] = useState<
		| "WebInstructions"
		| "MobileInstructions"
		| "Guideline"
		| "DetailGuide"
		| null
	>(null);

	const handleProfileClick = (profile: ProfileData) => {
		if (accessToken === null) {
			setUseGuideModal(true);
			setSelectedCardKey("MobileInstructions"); //이게 문제였다...ㅠㅠㅠ해결완료...나중에 벨로그회고
			// console.log('useGuideModal 실행됨:', useGuideModal)
			return;
		}
		setSelectedCardKey("MobileInstructions");

		if (!profile.is_vacation) {
			router.push(`/${profile.nickname}`);
		}
	};

	return {
		handleProfileClick,
		useGuideModal,
		setUseGuideModal,
		selectedCardKey,
	};
}
