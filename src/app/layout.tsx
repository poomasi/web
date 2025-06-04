import { Footer } from "@components/common/Footer/Footer";
import { Header } from "@components/common/Header/Header";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode; //타입명시
}) {
	return (
		<html lang="ko">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
