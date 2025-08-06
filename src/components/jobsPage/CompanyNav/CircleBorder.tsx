import { ReactNode } from "react";

interface CircleBorderProps {
	children: ReactNode;
	hasNewJobs?: boolean; // 7일 이내 새 채용공고 여부
	size?: "sm" | "md" | "lg";
}

// SRP: 동그라미 테두리 스타일만 담당
export function CircleBorder({
	children,
	hasNewJobs = false,
	size = "md",
}: CircleBorderProps) {
	// 크기별 스타일 정의
	const sizeStyles = {
		sm: "w-12 h-12",
		md: "w-16 h-16",
		lg: "w-20 h-20",
	};

	// 새 채용공고 여부에 따른 테두리 색상
	const borderColor = hasNewJobs
		? "border-green-500" // 새 채용공고가 있으면 초록색
		: "border-gray-800"; // 기본은 진한 회색

	return (
		<div
			className={`
			${sizeStyles[size]} rounded-full border-4 ${borderColor} 
			overflow-hidden shadow-sm transition-colors duration-200
		`}>
			{children}
		</div>
	);
}
