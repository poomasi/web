"use client";

import Image from "next/image";
import { CompanyParentResponse } from "@api/types/company.types";
import { useState } from "react";

interface CompanyInfoProps {
	company: CompanyParentResponse;
}

// SRP: 회사 정보 표시만 담당
export function CompanyInfo({ company }: CompanyInfoProps) {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<section className="flex flex-col items-center gap-6 py-8">
			{/* 회사 로고 */}
			<figure className="relative w-24 h-24">
				{imageError ? (
					<div className="w-full h-full rounded-xl bg-green-500 flex items-center justify-center">
						<span className="text-white text-3xl font-bold">
							{company.name.charAt(0)}
						</span>
					</div>
				) : (
					<Image
						src={company.logo_url}
						alt={`${company.name} 로고`}
						width={96}
						height={96}
						className="w-full h-full object-cover rounded-xl"
						onError={handleImageError}
						priority
					/>
				)}
			</figure>

			{/* 회사 이름 */}
			<div className="flex flex-col items-center gap-2">
				<h2 className="text-2xl font-bold text-gray-900">
					{company.name}
					{company.english_name && (
						<span className="text-gray-500 font-normal ml-2">
							({company.english_name})
						</span>
					)}
				</h2>
			</div>

			{/* 회사 설명 */}
			{company.description && (
				<div className="max-w-3xl">
					<p className="text-gray-600 text-center leading-relaxed whitespace-pre-line">
						{company.description}
					</p>
				</div>
			)}
		</section>
	);
}
