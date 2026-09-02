import type { SalesTypeId } from "./types";

// 「6つの営業タイプを見る」一覧(仕様書23項)用の「得意なこと3つ」。
// 序列を作らないため、あくまで各タイプの持ち味を3つ挙げるだけの構成にしている。
export const TYPE_TOP_STRENGTHS: Record<SalesTypeId, string[]> = {
  empathyConsultant: ["相手が安心して話せる空気をつくる", "本音や不安を引き出す", "焦らず信頼関係を積み重ねる"],
  problemFinder: ["誠実な質問で信頼を積み重ねる", "本当の課題にじっくりたどり着く", "長期的な関係を大切にする"],
  strategicProposer: ["情報を論理的に整理する", "納得感のある提案を組み立てる", "根拠を持って説明する"],
  breakthroughAction: ["行動量とスピードで機会を広げる", "試行錯誤しながら改善する", "新しい商談に前向きに挑む"],
  decisionLeader: ["顧客の迷いを整理する", "商談をテンポよく前進させる", "決断の後押しをする"],
  adaptiveAllRounder: ["相手に合わせて柔軟に対応する", "選択肢を示して一緒に考える", "幅広いタイプの顧客に対応できる"],
};
