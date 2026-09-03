// テスト結果保存機能(管理者がテスターの診断結果とアンケートを後から振り返るための仕組み)の型定義。
// 診断ロジック本体(scoring.ts等)には一切手を入れず、保存したいデータの形だけをここで定義する。

import type {
  AbilityKey,
  AbilityScores,
  Answers,
  Experience,
  Industry,
  MeetingMethod,
  SalesStyle,
  SalesTarget,
  SalesTypeId,
} from "@/lib/types";

export type LengthRating = "short" | "good" | "long";
export type TriStateOpinion = "yes" | "neutral" | "no";
export type WillingnessToPay = "yes" | "depends" | "no";

/** 診断結果画面の「テスト結果を保存」フォームで、診断結果に追加して送信する回答 */
export interface TestFeedbackInput {
  nickname: string;
  accuracyRating: 1 | 2 | 3 | 4 | 5;
  lengthRating: LengthRating;
  mostUseful: string;
  tooMuchOrUnnecessary: string;
  freeComment: string;
  recommendColleague: TriStateOpinion;
  willingnessToPay: WillingnessToPay;
  priceSentiment: string;
}

/** 保存API(/api/test-results)に送信するリクエストボディ全体 */
export interface TestResultSubmission extends TestFeedbackInput {
  industry: Industry;
  salesTarget: SalesTarget | null;
  salesStyle: SalesStyle;
  meetingMethod: MeetingMethod;
  experience: Experience;
  answers: Answers;
  abilityScores: AbilityScores;
  mainType: SalesTypeId;
  subType: SalesTypeId;
  overallScore: number;
  topStrengths: AbilityKey[];
  topGrowth: AbilityKey[];
}

/** DBの1行(管理画面での表示・CSV出力用)。created_atとidが保存時に付与される */
export interface TestResultRow extends TestResultSubmission {
  id: string;
  createdAt: string;
}
