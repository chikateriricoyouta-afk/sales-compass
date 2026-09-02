"use client";

import { useState } from "react";
import type { Profile } from "@/lib/types";
import {
  EXPERIENCE_OPTIONS,
  INDUSTRY_OPTIONS,
  MEETING_METHOD_OPTIONS,
  SALES_STYLE_OPTIONS,
  SALES_TARGET_OPTIONS,
} from "@/lib/profileOptions";
import { PageShell, PageCard } from "./PageCard";
import { CharacterAvatar } from "./CharacterAvatar";
import { GradientButton } from "./Button";
import { HERO_ORDER } from "@/lib/characters";

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border px-3 py-3 text-sm transition ${
              value === opt.value
                ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                : "border-purple-100 bg-white text-slate-600 hover:border-purple-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProfileForm({ onSubmit }: { onSubmit: (profile: Profile) => void }) {
  const [industry, setIndustry] = useState<Profile["industry"]>();
  const [salesTarget, setSalesTarget] = useState<Profile["salesTarget"]>();
  const [salesStyle, setSalesStyle] = useState<Profile["salesStyle"]>();
  const [meetingMethod, setMeetingMethod] = useState<Profile["meetingMethod"]>();
  const [experience, setExperience] = useState<Profile["experience"]>();

  const requiresTarget = industry === "insurance";
  const canSubmit =
    !!industry &&
    (!requiresTarget || !!salesTarget) &&
    !!salesStyle &&
    !!meetingMethod &&
    !!experience;

  function handleSubmit() {
    if (!industry || !salesStyle || !meetingMethod || !experience) return;
    onSubmit({
      industry,
      salesTarget: requiresTarget ? salesTarget : undefined,
      salesStyle,
      meetingMethod,
      experience,
    });
  }

  return (
    <PageShell>
      <PageCard className="max-w-2xl">
        <div className="mx-auto flex -space-x-2">
          {HERO_ORDER.map((id) => (
            <div key={id} className="rounded-full ring-2 ring-white">
              <CharacterAvatar typeId={id} size="sm" muted />
            </div>
          ))}
        </div>

        <h2 className="mt-4 text-center text-lg font-semibold text-slate-900 sm:text-xl">
          まずは、あなたの営業について教えてください
        </h2>
        <p className="mt-1 text-center text-sm text-slate-500">回答内容に応じた診断コメントの表示に使用します。</p>

        <div className="mt-8 space-y-7">
          <OptionGroup label="業種" options={INDUSTRY_OPTIONS} value={industry} onChange={setIndustry} />
          {requiresTarget && (
            <OptionGroup
              label="営業対象"
              options={SALES_TARGET_OPTIONS}
              value={salesTarget}
              onChange={setSalesTarget}
            />
          )}
          <OptionGroup
            label="営業スタイル"
            options={SALES_STYLE_OPTIONS}
            value={salesStyle}
            onChange={setSalesStyle}
          />
          <OptionGroup
            label="商談方法"
            options={MEETING_METHOD_OPTIONS}
            value={meetingMethod}
            onChange={setMeetingMethod}
          />
          <OptionGroup
            label="営業経験"
            options={EXPERIENCE_OPTIONS}
            value={experience}
            onChange={setExperience}
          />
        </div>

        <GradientButton onClick={handleSubmit} disabled={!canSubmit} className="mt-10 w-full">
          質問へ進む
        </GradientButton>
      </PageCard>
    </PageShell>
  );
}
