import { QUESTIONS } from "./questions";
import { SALES_TYPES, SALES_TYPE_ORDER } from "./salesTypes";
import {
  ABILITY_KEYS,
  type AbilityKey,
  type AbilityScores,
  type Answers,
  type SalesTypeId,
  type SalesTypeScoreResult,
} from "./types";

/** 1能力(6問, 最大30点)を0〜100点に変換する */
export function computeAbilityScores(answers: Answers): AbilityScores {
  const rawSums: Record<AbilityKey, number> = Object.fromEntries(
    ABILITY_KEYS.map((k) => [k, 0])
  ) as Record<AbilityKey, number>;

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw == null) continue;
    const points = q.reverse ? 6 - raw : raw;
    rawSums[q.ability] += points;
  }

  const scores = {} as AbilityScores;
  for (const key of ABILITY_KEYS) {
    scores[key] = Math.round((rawSums[key] / 30) * 100);
  }
  return scores;
}

/** 8能力の平均(Ver.0.1は均等配点) */
export function computeOverallScore(abilityScores: AbilityScores): number {
  const values = ABILITY_KEYS.map((k) => abilityScores[k]);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

/**
 * 同点タイの優先順位: 適応力 → ヒアリング力 → 課題発見力 の順で優先(仕様書13項)。
 * 各タイプのスコア算出式がどの能力を使っているかを基準に、優先度の高い能力を
 * 使うタイプほど先に並べる固定の優先順位として実装している(Ver.0.1の暫定ロジック)。
 */
const TIE_BREAK_PRIORITY: SalesTypeId[] = [
  "adaptiveAllRounder", // 適応力を使用
  "problemFinder", // ヒアリング力+課題発見力を使用
  "empathyConsultant", // ヒアリング力を使用
  "strategicProposer", // 課題発見力を使用
  "decisionLeader",
  "breakthroughAction",
];

function tieBreakCompare(a: SalesTypeId, b: SalesTypeId): number {
  return TIE_BREAK_PRIORITY.indexOf(a) - TIE_BREAK_PRIORITY.indexOf(b);
}

export function computeSalesTypeResult(abilityScores: AbilityScores): SalesTypeScoreResult {
  const scores = {} as Record<SalesTypeId, number>;
  for (const id of SALES_TYPE_ORDER) {
    scores[id] = Math.round(SALES_TYPES[id].computeScore(abilityScores) * 10) / 10;
  }

  const ranked = [...SALES_TYPE_ORDER].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return tieBreakCompare(a, b);
  });

  return { scores, mainType: ranked[0], subType: ranked[1] };
}

export function computeDiagnosis(answers: Answers) {
  const abilityScores = computeAbilityScores(answers);
  const overallScore = computeOverallScore(abilityScores);
  const typeResult = computeSalesTypeResult(abilityScores);
  return { abilityScores, overallScore, typeResult };
}

/** 能力スコアが低い順に並べたキーの配列 */
export function abilitiesSortedAscending(abilityScores: AbilityScores): AbilityKey[] {
  return [...ABILITY_KEYS].sort((a, b) => abilityScores[a] - abilityScores[b]);
}

/** 能力スコアが高い順に並べたキーの配列 */
export function abilitiesSortedDescending(abilityScores: AbilityScores): AbilityKey[] {
  return [...ABILITY_KEYS].sort((a, b) => abilityScores[b] - abilityScores[a]);
}
