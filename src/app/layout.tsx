import { Footer } from "@components/common/Footer/Footer";
import { Header } from "@components/common/Header/Header";
import { CommonProvider } from "@components/common/CommonProvider.tsx";
import { suitFont } from "./font.ts";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; //타입명시
}) {
  return (
    <html lang="ko" className={`${suitFont.variable} ${suitFont.className}`}>
      <body>
        <CommonProvider>
          <Header />
          {children}
          <Footer />
        </CommonProvider>
      </body>
    </html>
  );
}
