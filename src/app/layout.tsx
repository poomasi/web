import { Footer } from "@components/common/Footer/Footer";
import { Header } from "@components/common/Header/Header";
import { CommonProvider } from "@components/common/CommonProvider.tsx";
import { suitFont } from "./font.ts";
import "./globals.css";
import { ServiceWorkerUnregister } from "../ServiceWorkerUnregister.tsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode; //타입명시
}) {
	return (
		<html
			lang="ko"
			className={`${suitFont.variable} ${suitFont.className}`}>
			<body>
				<CommonProvider>
					<ServiceWorkerUnregister />
					<Header />
					{children}
					<Footer />
				</CommonProvider>
			</body>
		</html>
	);
}
