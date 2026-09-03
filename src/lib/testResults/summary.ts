import { ABILITY_KEYS, type AbilityKey, type SalesTypeId } from "@/lib/types";
import { SALES_TYPE_ORDER } from "@/lib/salesTypes";
import type { TestResultRow } from "./types";

export interface TestResultsSummary {
  count: number;
  typeCounts: Record<SalesTypeId, number>;
  abilityAverages: Record<AbilityKey, number>;
  longRatio: number; // 「結果が長い」と回答した割合(0〜1)
  accuracyAverage: number;
  recommendYesRatio: number; // 同僚に勧めたい(はい)の割合(0〜1)
  willingnessCounts: { yes: number; depends: number; no: number };
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

export function summarizeTestResults(rows: TestResultRow[]): TestResultsSummary {
  const typeCounts = Object.fromEntries(SALES_TYPE_ORDER.map((id) => [id, 0])) as Record<
    SalesTypeId,
    number
  >;
  for (const row of rows) {
    typeCounts[row.mainType] = (typeCounts[row.mainType] ?? 0) + 1;
  }

  const abilityAverages = Object.fromEntries(
    ABILITY_KEYS.map((key) => [key, average(rows.map((r) => r.abilityScores[key]))])
  ) as Record<AbilityKey, number>;

  const longCount = rows.filter((r) => r.lengthRating === "long").length;
  const recommendYesCount = rows.filter((r) => r.recommendColleague === "yes").length;

  return {
    count: rows.length,
    typeCounts,
    abilityAverages,
    longRatio: rows.length ? longCount / rows.length : 0,
    accuracyAverage: average(rows.map((r) => r.accuracyRating)),
    recommendYesRatio: rows.length ? recommendYesCount / rows.length : 0,
    willingnessCounts: {
      yes: rows.filter((r) => r.willingnessToPay === "yes").length,
      depends: rows.filter((r) => r.willingnessToPay === "depends").length,
      no: rows.filter((r) => r.willingnessToPay === "no").length,
    },
  };
}
