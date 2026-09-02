"use client";

import { useState } from "react";
import { CharacterAvatar } from "./CharacterAvatar";
import { SALES_TYPES, SALES_TYPE_ORDER } from "@/lib/salesTypes";
import { CHARACTERS } from "@/lib/characters";
import { CUSTOMER_TYPE_AFFINITY, CUSTOMER_TYPE_LABELS } from "@/lib/feedback/customerTypes";
import { TYPE_TOP_STRENGTHS } from "@/lib/typeTopStrengths";

export function TypesShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border border-purple-200 bg-white py-3.5 text-base font-bold text-indigo-700 shadow-sm transition hover:border-purple-300"
      >
        {open ? "6つの営業タイプを閉じる" : "6つの営業タイプを見る"}
      </button>

      {open && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SALES_TYPE_ORDER.map((id) => {
            const type = SALES_TYPES[id];
            const character = CHARACTERS[id];
            const affinity = CUSTOMER_TYPE_AFFINITY[id];
            return (
              <div
                key={id}
                className={`rounded-2xl border border-purple-100 ${type.accent.soft} p-5 shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <CharacterAvatar typeId={id} size="sm" />
                  <div>
                    <p className="text-lg font-bold text-slate-900">{type.name}</p>
                    <p className={`text-sm font-semibold ${type.accent.text}`}>{type.catch}</p>
                  </div>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{character.personality}</p>

                <p className="mt-3 text-sm font-bold text-indigo-600">得意なこと</p>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-base text-slate-700">
                  {TYPE_TOP_STRENGTHS[id].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <p className="mt-3 text-sm font-bold text-indigo-600">相性が良い可能性のある顧客タイプ</p>
                <p className="mt-1 text-base text-slate-700">
                  {affinity.strongTypes.map((t) => CUSTOMER_TYPE_LABELS[t.id]).join(" / ")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
