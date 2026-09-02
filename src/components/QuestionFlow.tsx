"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import type { AnswerValue, Answers } from "@/lib/types";
import { PageShell, PageCard } from "./PageCard";
import { CharacterAvatar } from "./CharacterAvatar";
import { HERO_ORDER } from "@/lib/characters";

const SCALE_LABELS: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "まったく\n当てはまらない" },
  { value: 2, label: "あまり\n当てはまらない" },
  { value: 3, label: "どちらとも\nいえない" },
  { value: 4, label: "当てはまる" },
  { value: 5, label: "とても\n当てはまる" },
];

export function QuestionFlow({
  onComplete,
  onExit,
}: {
  onComplete: (answers: Answers) => void;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = QUESTIONS[index];
  const progress = index + 1;
  // 質問が進むごとに、隅のキャラクターをゆるやかに切り替える(演出のみ・診断ロジックには無関係)
  const cornerCharacter = HERO_ORDER[Math.floor(index / 8) % HERO_ORDER.length];

  function selectAnswer(value: AnswerValue) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);

    if (index < QUESTIONS.length - 1) {
      setTimeout(() => setIndex(index + 1), 150);
    } else {
      setTimeout(() => onComplete(next), 150);
    }
  }

  function goBack() {
    if (index === 0) {
      onExit();
    } else {
      setIndex(index - 1);
    }
  }

  return (
    <PageShell>
      <PageCard className="max-w-2xl">
        <div className="absolute right-4 top-4 opacity-70 sm:right-6 sm:top-6">
          <CharacterAvatar typeId={cornerCharacter} size="sm" muted />
        </div>

        <div className="mx-auto max-w-xl">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-wide text-indigo-500">🧭 営業スタイルを分析中</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">
                QUESTION {progress} / {QUESTIONS.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-purple-50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${(progress / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <p className="min-h-[4.5rem] text-lg font-medium leading-relaxed text-slate-900 sm:text-xl">
              {question.text}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-5">
              {SCALE_LABELS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectAnswer(opt.value)}
                  className={`whitespace-pre-line rounded-xl border px-3 py-4 text-center text-sm transition ${
                    answers[question.id] === opt.value
                      ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-indigo-200"
                      : "border-purple-100 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={goBack}
            className="mt-6 self-start text-sm text-slate-400 hover:text-slate-600"
          >
            ← 戻る
          </button>
        </div>
      </PageCard>
    </PageShell>
  );
}
