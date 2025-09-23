"use client";

interface FilterButtonProps {
	title: string;
	options: Array<{ id: string | number; name: string }>;
	selectedItems: (string | number)[];
	onToggle: (item: string | number, itemName?: string) => void;
	showSelectAllOption?: boolean;
}

export function FilterButton({
	title,
	options,
	selectedItems,
	onToggle,
	showSelectAllOption = false,
}: FilterButtonProps) {
	const isPositionType = title === "직군선택";

	// 전체 선택 상태 확인
	const isAllSelected =
		options.length > 0 && selectedItems.length === options.length;

	// 옵션 선택 여부 확인 함수
	const isItemSelected = (option: { id: string | number; name: string }) => {
		if (option.id === "all") return isAllSelected;
		return isPositionType
			? selectedItems.includes(option.id)
			: selectedItems.includes(option.name);
	};

	// 일반 옵션 클릭 핸들러
	const handleOptionClick = (option: { id: string | number; name: string }) => {
		if (isPositionType) {
			onToggle(option.id, option.name);
		} else {
			onToggle(option.name);
		}
	};

	// 전체 옵션 선택/해제 핸들러
	const handleSelectAll = () => {
		if (isAllSelected) {
			// 모든 옵션 해제
			options.forEach((opt) => handleOptionClick(opt));
		} else {
			// 모든 옵션 선택 (이미 선택된 항목은 건너뜀)
			options.forEach((opt) => {
				const isSelected = isPositionType
					? selectedItems.includes(opt.id)
					: selectedItems.includes(opt.name);

				if (!isSelected) handleOptionClick(opt);
			});
		}
	};

	// 옵션 클릭 핸들러
	const handleClick = (option: { id: string | number; name: string }) => {
		if (option.id === "all") {
			handleSelectAll();
		} else {
			handleOptionClick(option);
		}
	};

	// "전체" 옵션을 맨 앞에 추가
	const allOptions = showSelectAllOption
		? [{ id: "all", name: "전체" }, ...options]
		: options;

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-gray-900">{title}</h3>
				<span className="text-sm text-gray-500">중복 선택 가능</span>
			</div>
			<div className="flex flex-wrap gap-2">
				{allOptions.map((option) => (
					<button
						key={option.id}
						onClick={() => handleClick(option)}
						className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
							isItemSelected(option)
								? "bg-blue-50 text-blue-700 border-blue-300"
								: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
						}`}>
						{option.name}
					</button>
				))}
			</div>
		</div>
	);
}
