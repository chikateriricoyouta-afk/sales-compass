import type { ButtonHTMLAttributes } from "react";

/** トップ画面のCTAと同じブルー〜パープル〜ピンクのグラデーションボタン(主要アクション用) */
export function GradientButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:text-base ${className}`}
    >
      {children}
    </button>
  );
}

/** 控えめな二次アクション用ボタン(戻る・もう一度診断する等) */
export function SecondaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full border border-purple-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-purple-300 hover:text-indigo-700 ${className}`}
    >
      {children}
    </button>
  );
}
