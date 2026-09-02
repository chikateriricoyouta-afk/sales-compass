import type { AbilityKey } from "../types";

// 「今月伸ばす営業スキル」用の目標フレーズ(仕様書11項)。
// 「育成テーマ」に代わる、能力ごとの分かりやすいゴール表現。
export const GROWTH_GOAL_PHRASE: Record<AbilityKey, string> = {
  relationship: "初対面でも自然に心を開いてもらえる関係をつくる",
  listening: "相手が本音を話したくなる聞き方を身につける",
  problemFinding: "相手も気づいていない課題を一緒に見つける",
  proposalDesign: "聞いた話がそのまま伝わる提案をつくる",
  adaptability: "相手に合わせて商談の進め方を変えられるようになる",
  decisionSupport: "相手が納得して決められる状態をつくる",
  customerOrientation: "契約より先に、相手にとっての最善を考えられるようになる",
  actionImprovement: "商談の振り返りを次に活かせるようになる",
};
