"use client";

import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { globalTheme } from "@styles/global-theme.ts";
import { ThemeProvider } from "@mui/material";
import { GlobalStyle } from "@styles/GlobalStyle.tsx";
import { Toast } from "@components/common/toast/Toast";
import { useEffect, useState } from "react";
import { useMobileStore } from "@store/useMobileStore.ts";

interface CommonLayoutProps {
	children: React.ReactNode;
}

export function CommonProvider({ children }: CommonLayoutProps) {
	//QueryClient: React Query에서 서버 상태를 관리할 중심 객체
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {},
			// queries: {
			// 	staleTime: 5 * 60 * 1000, // 5분 기본 캐시
			// 	gcTime: 10 * 60 * 1000, // 10분 가비지 컬렉션
			// 	retry: 1, // 실패 시 1번 재시도
			// 	refetchOnWindowFocus: false, // 윈도우 포커스 시 리패치 비활성화
			// },
		},
		//queryCache: 모든 쿼리의 캐시 상태를 관리하는 객체
		queryCache: new QueryCache({
			onError: (error, query) => {
				console.log("Query Error Details:", {
					error,
					queryKey: query.queryKey,
					queryHash: query.queryHash,
					state: query.state,
				});
			},
		}),
	});

	const { setIsMobile } = useMobileStore();
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		const sizeCheckEvent = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		sizeCheckEvent();
		window.addEventListener("resize", sizeCheckEvent);

		setHasMounted(true);

		return () => {
			window.removeEventListener("resize", sizeCheckEvent);
		};
	}, []);

	if (!hasMounted) return null; // hydration mismatch 방지

	return (
		<ThemeProvider theme={globalTheme}>
			{/* QueryClientProvider에 넘겨줘야 React Query 기능들이 작동 */}
			<QueryClientProvider client={queryClient}>
				<GlobalStyle />
				{children}
				<Toast />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
