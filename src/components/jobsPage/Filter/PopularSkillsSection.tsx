"use client";

import React from "react";
import Image from "next/image";

import type { PopularSkillData } from "@constants/popularSkills";

interface PopularSkillsSectionProps {
	title: string;
	skills: PopularSkillData[];
	selectedSkillIds: number[];
	onToggle: (skillId: number) => void;
}

export function PopularSkillsSection({
	title,
	skills,
	selectedSkillIds,
	onToggle,
}: PopularSkillsSectionProps) {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between gap-4 mb-4">
				<h3 className="text-lg font-medium text-gray-900">{title}</h3>
				<span className="text-sm text-gray-500">중복 선택 가능</span>
			</div>
			<div className="grid grid-cols-5 gap-3">
				{skills.map((skill) => {
					const skillId = skill.skill_id;
					const isAvailable = skill.isAvailable && typeof skillId === "number";
					const isSelected =
						isAvailable && typeof skillId === "number"
							? selectedSkillIds.includes(skillId)
							: false;
					const buttonKey = skillId ?? skill.displayName;

					return (
						<button
							type="button"
							key={buttonKey}
							onClick={() => {
								if (isAvailable && typeof skillId === "number") {
									onToggle(skillId);
								}
							}}
							disabled={!isAvailable}
							className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
								!isAvailable
									? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
									: isSelected
									? "bg-blue-50 text-blue-700 border-blue-300"
									: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
							}`}>
							<div className="w-6 h-6 relative flex-shrink-0">
								{skill.logo_url ? (
									<Image
										src={skill.logo_url}
										alt={skill.displayName}
										width={24}
										height={24}
										className="object-contain"
										onError={() => {
											console.warn(`이미지 로드 실패: ${skill.displayName}`);
										}}
									/>
								) : (
									<div className="w-full h-full rounded bg-gray-200" aria-hidden />
								)}
							</div>
							<span>
								{skill.displayName}
								{!isAvailable ? " (준비중)" : ""}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
