"use client";

import { useState } from "react";
import { RecruitmentResponse } from "@types";

interface PositionFilterProps {
	jobs: RecruitmentResponse[];
	selectedPositions: string[];
	onPositionChange: (positions: string[]) => void;
}

export function PositionFilter({
	jobs,
	selectedPositions,
	onPositionChange,
}: PositionFilterProps) {
	const [isOpen, setIsOpen] = useState(false);

	const uniquePositions = Array.from(
		new Set(jobs.map((job) => job.position_title).filter(Boolean))
	).sort();

	const handlePositionToggle = (position: string) => {
		const isSelected = selectedPositions.includes(position);

		if (isSelected) {
			onPositionChange(selectedPositions.filter((p) => p !== position));
		} else {
			onPositionChange([...selectedPositions, position]);
		}
	};

	const handleSelectAll = () => {
		if (selectedPositions.length === uniquePositions.length) {
			onPositionChange([]);
		} else {
			onPositionChange(uniquePositions);
		}
	};

	const buttonClass =
		selectedPositions.length > 0
			? "flex items-center justify-between px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-200 min-w-[120px] bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200"
			: "flex items-center justify-between px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-200 min-w-[120px] bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100";

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={buttonClass}>
				<span>
					{selectedPositions.length === 0
						? "position"
						: selectedPositions.length === 1
							? selectedPositions[0]
							: `position (${selectedPositions.length})`}
				</span>
				<svg
					className={`ml-2 h-4 w-4 transition-transform duration-200 `}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
					<div className="p-2 border-b border-gray-200">
						<button
							onClick={handleSelectAll}
							className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50 rounded">
							<input
								type="checkbox"
								checked={selectedPositions.length === uniquePositions.length}
								readOnly
								className="mr-3 h-4 w-4 text-purple-600 rounded"
							/>
							<span className="font-medium">
								전체{" "}
								{selectedPositions.length === uniquePositions.length
									? "해제"
									: "선택"}
							</span>
						</button>
					</div>

					<div className="max-h-60 overflow-y-auto">
						{uniquePositions.map((position) => {
							const isSelected = selectedPositions.includes(position);
							const jobCount = jobs.filter(
								(job) => job.position_title === position
							).length;

							return (
								<button
									key={position}
									onClick={() => handlePositionToggle(position)}
									className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50">
									<input
										type="checkbox"
										checked={isSelected}
										readOnly
										className="mr-3 h-4 w-4 text-purple-600 rounded"
									/>
									<div className="flex-1">
										<span>{position}</span>
										<span className="ml-2 text-xs text-gray-500">
											({jobCount})
										</span>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{isOpen && (
				<div
					className="fixed inset-0 z-0"
					onClick={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
}
