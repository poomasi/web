import { CompanyParentResponse } from "@types";
import Image from "next/image";
import { useState } from "react";

interface CompanyCategoryProps {
	company: CompanyParentResponse;
	isSelected: boolean;
	onClick: (company: CompanyParentResponse) => void;
}

export function CompanyNav({
	company,
	isSelected,
	onClick,
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
				${isSelected ? "opacity-100" : "opacity-70"}
			`}
			role="tab"
			aria-selected={isSelected}
			aria-label={`${company.name} 채용공고 보기`}>
			{/* 동그란 회사 로고 */}
			<figure className="relative w-16 h-16">
				{imageError ? (
					// 이미지 로드 실패 시 보여줄 기본 아이콘
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
				)}
			</figure>

			<span className="text-xs font-medium text-gray-700 text-center max-w-[64px] truncate">
				{company.name}
			</span>
		</button>
	);
}
