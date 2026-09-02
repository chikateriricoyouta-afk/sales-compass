// Sales Compass Ver.0.1 の型定義。
// 質問・採点式・業種別コメントを差し替えやすくするため、
// ロジック(scoring.ts)とデータ(questions.ts, feedback/*)をこのファイルの型で仲介する。

export const ABILITY_KEYS = [
  "relationship",
  "listening",
  "problemFinding",
  "proposalDesign",
  "adaptability",
  "decisionSupport",
  "customerOrientation",
  "actionImprovement",
] as const;

export type AbilityKey = (typeof ABILITY_KEYS)[number];

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  relationship: "関係構築力",
  listening: "ヒアリング力",
  problemFinding: "課題発見力",
  proposalDesign: "提案設計力",
  adaptability: "適応力",
  decisionSupport: "決断支援力",
  customerOrientation: "顧客志向",
  actionImprovement: "行動・改善力",
};

export interface Question {
  id: number; // 1-48
  ability: AbilityKey;
  text: string;
  reverse: boolean;
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

/** 質問id -> 回答値 */
export type Answers = Partial<Record<number, AnswerValue>>;

export type Industry = "insurance" | "other";
export type SalesTarget = "individual" | "corporate" | "both";
export type SalesStyle = "newBusiness" | "existing" | "both";
export type MeetingMethod = "faceToFace" | "online" | "phone" | "mixed";
export type Experience = "under1" | "1to3" | "4to10" | "over11";

export interface Profile {
  industry: Industry;
  salesTarget?: SalesTarget; // industry === "insurance" のときのみ使用
  salesStyle: SalesStyle;
  meetingMethod: MeetingMethod;
  experience: Experience;
}

export const SALES_TYPE_IDS = [
  "empathyConsultant",
  "problemFinder",
  "strategicProposer",
  "breakthroughAction",
  "decisionLeader",
  "adaptiveAllRounder",
] as const;

export type SalesTypeId = (typeof SALES_TYPE_IDS)[number];

export interface AbilityScores extends Record<AbilityKey, number> {}

export interface SalesTypeScoreResult {
  scores: Record<SalesTypeId, number>;
  mainType: SalesTypeId;
  subType: SalesTypeId;
}

export interface DiagnosisResult {
  profile: Profile;
  abilityScores: AbilityScores;
  overallScore: number;
  typeResult: SalesTypeScoreResult;
}

export type FeedbackLevel = "high" | "mid" | "low";

export function levelOf(score: number): FeedbackLevel {
  if (score >= 75) return "high";
  if (score >= 50) return "mid";
  return "low";
}
