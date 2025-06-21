import localFont from "next/font/local";

export const suitFont = localFont({
  src: [
    {
      path: "../../public/fonts/SUIT-VARIABLE.ttf", // 경로 수정
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-suit",
  display: "swap",
});
