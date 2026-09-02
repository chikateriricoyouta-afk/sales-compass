import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Logo } from "@/components/Logo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sales Compass",
  description: "営業の強みを可視化し、成長の方向を見つける。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-b from-white via-[#faf9ff] to-[#f3f1fd]">
        <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 px-6 py-2 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <a href="#top">
              <Logo size="sm" />
            </a>
            <nav className="hidden items-center gap-6 text-xs font-medium text-slate-500 sm:flex">
              <a href="#about" className="transition hover:text-indigo-600">
                診断について
              </a>
              <a href="#types" className="transition hover:text-indigo-600">
                タイプ紹介
              </a>
              <a href="#howto" className="transition hover:text-indigo-600">
                活用方法
              </a>
              <a href="#faq" className="transition hover:text-indigo-600">
                よくある質問
              </a>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
