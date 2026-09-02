/** トップ画面の背景に置く、薄いコンパスの線画(装飾専用・彩度を抑えたウォーターマーク) */
export function CompassWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const long = i % 6 === 0;
        const r1 = 92;
        const r2 = long ? 82 : 87;
        const rad = (angle * Math.PI) / 180;
        // サーバー/クライアントで三角関数の浮動小数点誤差がわずかに異なり
        // hydration mismatchになるため、小数点以下2桁に丸めて文字列を固定する。
        const round = (n: number) => Math.round(n * 100) / 100;
        return (
          <line
            key={i}
            x1={round(100 + r1 * Math.sin(rad))}
            y1={round(100 - r1 * Math.cos(rad))}
            x2={round(100 + r2 * Math.sin(rad))}
            y2={round(100 - r2 * Math.cos(rad))}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
      <path d="M100 40 L112 100 L100 160 L88 100 Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** 小さな4方向のきらめき(星)アイコン。子供っぽくなりすぎないよう控えめなサイズ・透明度で使う想定 */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
        fill="url(#sparkleGradient)"
      />
      <defs>
        <linearGradient id="sparkleGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
    </svg>
  );
}
