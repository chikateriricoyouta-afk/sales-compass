import type { SalesTypeId } from "./types";

/**
 * 6営業タイプのキャラクター設定。
 * 画像は /public/characters/ 配下から読み込む想定(未配置でも絵文字フォールバックで破綻しない)。
 * 既存の6タイプ(SalesTypeId)の採点ロジックは変更せず、表示用のキャラクターを紐付けている。
 *
 * マッピングの考え方(既存タイプ → 新キャラクター):
 * - empathyConsultant  (関係構築+顧客志向+ヒアリング) → 🦉共感コンサル型・フクロウ  ※そのまま
 * - strategicProposer  (課題発見+提案設計)           → 🦁戦略提案型・ライオン      ※そのまま
 * - decisionLeader     (決断支援+提案設計)           → 🐬即決リード型・イルカ      ※そのまま
 * - adaptiveAllRounder (適応力)                      → 🦊提案パートナー型・キツネ  (「柔軟」というキーワードが適応力と直結)
 * - breakthroughAction (行動改善+決断支援)           → 🐰チャレンジ開拓型・ウサギ  (「行動・改善」がそのまま合致)
 * - problemFinder      (ヒアリング+課題発見)         → 🐻信頼築き型・クマ         (誠実に聞き続け、信頼を積み重ねながら課題にたどり着くタイプとして再解釈)
 */
export interface CharacterDef {
  emoji: string;
  imageFile: string; // /public/characters/ からの相対ファイル名
  animal: string;
  keywords: string[];
  outfit: string;
  personality: string;
}

export const CHARACTERS: Record<SalesTypeId, CharacterDef> = {
  empathyConsultant: {
    emoji: "🦉",
    imageFile: "empathy-owl.png",
    animal: "フクロウ",
    keywords: ["聞く", "安心感", "信頼", "相談"],
    outfit: "ネイビー系スーツ",
    personality: "穏やか、知的、聞き上手",
  },
  adaptiveAllRounder: {
    emoji: "🦊",
    imageFile: "partner-fox.png",
    animal: "キツネ",
    keywords: ["一緒に考える", "選択肢", "提案", "柔軟"],
    outfit: "明るいスーツ",
    personality: "スマート、親しみやすい",
  },
  strategicProposer: {
    emoji: "🦁",
    imageFile: "strategy-lion.png",
    animal: "ライオン",
    keywords: ["論理", "戦略", "課題解決", "提案設計"],
    outfit: "ネイビースーツ",
    personality: "落ち着き、自信、論理的",
  },
  decisionLeader: {
    emoji: "🐬",
    imageFile: "lead-dolphin.png",
    animal: "イルカ",
    keywords: ["スピード", "前進", "決断", "クロージング"],
    outfit: "グリーン〜ブルー系スーツ",
    personality: "明るい、行動的、テンポが良い",
  },
  problemFinder: {
    emoji: "🐻",
    imageFile: "trust-bear.png",
    animal: "クマ",
    keywords: ["誠実", "継続", "安心", "長期関係"],
    outfit: "ブラウン系スーツ",
    personality: "誠実、温かい、堅実",
  },
  breakthroughAction: {
    emoji: "🐰",
    imageFile: "challenge-rabbit.png",
    animal: "ウサギ",
    keywords: ["行動", "新規開拓", "挑戦", "改善"],
    outfit: "グリーン系スーツ",
    personality: "前向き、行動派、好奇心",
  },
};

/**
 * トップ画面で確定した6キャラクターの表示順(フクロウ→キツネ→ライオン→イルカ→クマ→ウサギ)。
 * 採点で使う SALES_TYPE_ORDER(salesTypes.ts)とは役割が違うため独立して持つ。
 * (SALES_TYPE_ORDER を並べ替えるとスコア計算の同点時の順位付けに影響するため触らない)
 * トップ・質問画面・結果画面など、キャラクターを横並びで見せる箇所はすべてこの順序を使う。
 */
export const HERO_ORDER: SalesTypeId[] = [
  "empathyConsultant", // 🦉 フクロウ
  "adaptiveAllRounder", // 🦊 キツネ
  "strategicProposer", // 🦁 ライオン
  "decisionLeader", // 🐬 イルカ
  "problemFinder", // 🐻 クマ
  "breakthroughAction", // 🐰 ウサギ
];
