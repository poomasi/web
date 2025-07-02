// src/app/ClientLayout.tsx
//클라이언트 전용 wrapper
"use client";

import { CommonProvider } from "@components/common/CommonProvider";
import { Header } from "@components/common/Header/Header";
import { Footer } from "@components/common/Footer/Footer";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CommonProvider>
			<Header /> {/* ✅ 클라이언트에서만 렌더링됨 */}
			{children}
			<Footer />
		</CommonProvider>
	);
}
