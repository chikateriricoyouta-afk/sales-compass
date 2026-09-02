"use client";

import { PageShell, PageCard } from "./PageCard";
import { CharacterAvatar } from "./CharacterAvatar";
import { GradientButton } from "./Button";
import { CompassMark } from "./Logo";
import { HERO_ORDER } from "@/lib/characters";

/**
 * 48問回答後、結果を表示する前に挟む短い演出画面。
 * 「診断完了！」の高揚感を出しつつ、長い待機時間は作らない(手動で次へ進む)。
 */
export function DiagnosisTransition({ onContinue }: { onContinue: () => void }) {
  return (
    <PageShell>
      <PageCard className="max-w-xl">
        <div className="flex flex-col items-center py-6 text-center">
          <CompassMark className="h-10 w-10 animate-[spin_6s_linear_infinite]" />
          <p className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">診断完了！</p>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">あなたの営業スタイルが見えてきました</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {HERO_ORDER.map((id) => (
              <CharacterAvatar key={id} typeId={id} size="sm" muted />
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">あなたは、どのタイプだったんだろう？</p>

          <GradientButton onClick={onContinue} className="mt-8 w-full max-w-xs">
            結果を見る →
          </GradientButton>
        </div>
      </PageCard>
    </PageShell>
  );
}
