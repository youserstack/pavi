import { Inter, Orbitron } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter", // 사용자 정의 CSS 변수
  weight: "400",
  subsets: ["latin"],
});

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: "700",
  subsets: ["latin"],
});

export const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "700"],
  // weight: ["700"],
  subsets: ["cyrillic"],
});
