import { ABILITY_LABELS, type AbilityKey, type AbilityScores } from "@/lib/types";
import { abilitiesSortedDescending } from "@/lib/scoring";

export function AbilityBars({ scores }: { scores: AbilityScores }) {
  const descending = abilitiesSortedDescending(scores);
  const top3 = new Set<AbilityKey>(descending.slice(0, 3));
  const lowest = descending[descending.length - 1];

  return (
    <div className="space-y-4">
      {descending.map((key) => {
        const isTop3 = top3.has(key);
        const isLowest = key === lowest;
        return (
          <div key={key}>
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-y-1">
              <span className="flex flex-wrap items-center gap-2 text-base font-semibold text-slate-800">
                {ABILITY_LABELS[key]}
                {isTop3 && (
                  <span className="rounded-full bg-gradient-to-r from-amber-200 to-yellow-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-amber-300/60">
                    武器 TOP3
                  </span>
                )}
                {isLowest && (
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
                    伸ばすと成果が変わる
                  </span>
                )}
              </span>
              <span className="text-xl font-bold text-slate-900">{scores[key]}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  isTop3
                    ? "bg-gradient-to-r from-amber-400 to-yellow-300"
                    : isLowest
                      ? "bg-gradient-to-r from-blue-400 to-blue-300"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500"
                }`}
                style={{ width: `${scores[key]}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
