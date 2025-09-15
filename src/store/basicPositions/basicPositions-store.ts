import { create } from "zustand";
import { PositionResponse } from "@api/types";
import { PositionsApi } from "@api/positions";
import { POSITION_IDS } from "@types";

// 1) 모듈 상단에 연관 ID 상수 분리
const FRONTEND_RELATED_IDS: number[] = [
	POSITION_IDS.WEB_FRONTEND,
	POSITION_IDS.FULLSTACK,
];

interface PositionsState {
	positions: PositionResponse[];
	selectedPositions: string[];
	loading: boolean;
	error: string | null;

	fetchPositions: () => Promise<void>;
	setSelectedPositions: (positions: string[]) => void;
	clearSelectedPositions: () => void;
	initializeWithWebFrontend: () => Promise<void>;
}

export const useBasicPositionsStore = create<PositionsState>((set, get) => ({
	// 초기 상태
	positions: [],
	selectedPositions: [],
	loading: false,
	error: null,

	// 포지션 목록 가져오기
	fetchPositions: async () => {
		set({ loading: true, error: null });
		try {
			const positions = await PositionsApi.getPositions();
			set({ positions, loading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: "포지션 데이터를 불러오는데 실패했습니다.",
				loading: false,
			});
		}
	},

	// 선택된 포지션 설정
	setSelectedPositions: (selectedPositions: string[]) => {
		set({ selectedPositions });
	},

	// 선택된 포지션 초기화
	clearSelectedPositions: () => {
		set({ selectedPositions: [] });
	},

	// Web Frontend 기본값으로 초기화
	initializeWithWebFrontend: async () => {
		const { positions, fetchPositions } = get();

		// 포지션 없으면 먼저 로드
		if (positions.length === 0) {
			await fetchPositions();
		}

		// 최신 상태 가져오기 (await 이후 보장)
		const current = get().positions;

		// 1순위: WEB_FRONTEND 정확 매칭
		const webFrontend = current.find(
			(p) => p.position_id === POSITION_IDS.WEB_FRONTEND
		);
		if (webFrontend) {
			set({ selectedPositions: [webFrontend.title] });
			return;
		}

		// 2순위: 연관 포지션들(FULLSTACK 등)
		const frontendPositions = current
			.filter((p) => FRONTEND_RELATED_IDS.includes(p.position_id))
			.map((p) => p.title);

		// 관련 포지션 없으면 빈 배열로 초기화(의도적으로 허용)
		set({ selectedPositions: frontendPositions });
	},
}));
