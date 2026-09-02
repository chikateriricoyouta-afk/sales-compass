import { CompassWatermark, Sparkle } from "./Decor";
import { IconInfo } from "./Icons";

/**
 * Sales Compass全体の共通コンテナ。
 * トップ画面で確定したデザイン(白〜淡いラベンダー背景の上に浮かぶ、角丸・薄紫ボーダー・
 * ソフトシャドウの大きなカード+コンパス線画+きらめき)を、プロフィール入力/質問/結果画面など
 * サービス全体で使い回すための共通コンポーネント。
 * ここを直せば全画面のカードデザインが一括で変わる。
 */
export function PageCard({
  children,
  className = "max-w-7xl",
  watermark = true,
}: {
  children: React.ReactNode;
  /** カードの最大幅(Tailwindのmax-w-*)。画面ごとに内容量が違うため上書き可能にしている */
  className?: string;
  watermark?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-[1.75rem] border border-purple-100 bg-white/75 px-4 py-5 shadow-[0_12px_45px_-18px_rgba(99,102,241,0.35)] backdrop-blur sm:rounded-[2rem] sm:px-6 sm:py-6 ${className}`}
    >
      {watermark && (
        <>
          <CompassWatermark className="pointer-events-none absolute -right-20 -top-16 h-[22rem] w-[22rem] text-indigo-900/[0.05] sm:-right-14 sm:h-[26rem] sm:w-[26rem]" />
          <Sparkle className="pointer-events-none absolute left-[8%] top-12 h-4 w-4 opacity-60" />
          <Sparkle className="pointer-events-none absolute right-[10%] top-8 h-3 w-3 opacity-45" />
        </>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

/** カードの外側、ビューポート端との余白を揃えるための共通シェル */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="px-3 py-3 sm:px-5 sm:py-4">{children}</div>;
}

/**
 * 注意書き・補足情報を表示する共通ボックス。
 * 「グレー文字は禁止」ルールに沿って、薄いグレーの極小文字ではなく
 * ネイビー文字+インフォアイコン+淡い色の情報ボックスとして表示する。
 */
export function InfoBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:text-base ${className}`}
    >
      <IconInfo className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
      <p>{children}</p>
    </div>
  );
}
