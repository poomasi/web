import { CompanyParentResponse } from "@types";
import Image from "next/image";
import { useState } from "react";
<<<<<<< HEAD
import { CircleBorder } from "./CircleBorder";
=======
>>>>>>> b0032f17 (chore: 컴포넌트명 변경)

interface CompanyCategoryProps {
	company: CompanyParentResponse;
	isSelected: boolean;
	onClick: (company: CompanyParentResponse) => void;
<<<<<<< HEAD
	hasNewJobs?: boolean; // 7일 이내 새 채용공고 여부
=======
>>>>>>> b0032f17 (chore: 컴포넌트명 변경)
}

export function CompanyNav({
	company,
	isSelected,
	onClick,
<<<<<<< HEAD
	hasNewJobs = false,
=======
>>>>>>> b0032f17 (chore: 컴포넌트명 변경)
}: CompanyCategoryProps) {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<button
			onClick={() => onClick(company)}
			className={`
				flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer 
				transition-all duration-200 hover:scale-110
<<<<<<< HEAD
=======
				${isSelected ? "opacity-100" : "opacity-70"}
>>>>>>> b0032f17 (chore: 컴포넌트명 변경)
			`}
			role="tab"
			aria-selected={isSelected}
			aria-label={`${company.name} 채용공고 보기`}>
			{/* 동그란 회사 로고 */}
			<figure className="relative w-16 h-16">
				{imageError ? (
					// 이미지 로드 실패 시 보여줄 기본 아이콘
<<<<<<< HEAD
					<CircleBorder hasNewJobs={hasNewJobs}>
						<div className="bg-gray-100 flex items-center justify-center w-full h-full">
							<span className="text-gray-600 text-lg font-bold">
								{company.name.charAt(0)}
							</span>
						</div>
					</CircleBorder>
				) : (
					// 정상 이미지 - 동그라미 테두리로 감싸기
					<CircleBorder hasNewJobs={hasNewJobs}>
						<Image
							src={company.logo_url}
							alt={`${company.name} 로고`}
							width={64}
							height={64}
							className="w-full h-full object-cover"
							onError={handleImageError}
						/>
					</CircleBorder>
=======
					<div
						className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-md"
						aria-hidden="true">
						<span className="text-gray-600 text-lg font-bold">
							{company.name.charAt(0)}
						</span>
					</div>
				) : (
					// 정상 이미지
					<Image
						src={company.logo_url}
						alt={`${company.name} 로고`}
						width={64}
						height={64}
						className="object-cover"
						onError={handleImageError}
					/>
>>>>>>> b0032f17 (chore: 컴포넌트명 변경)
				)}
			</figure>

			<span className="text-xs font-medium text-gray-700 text-center max-w-[64px] truncate">
				{company.name}
			</span>
		</button>
	);
}
