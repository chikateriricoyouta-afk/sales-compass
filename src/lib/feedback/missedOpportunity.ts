import type { AbilityKey, SalesTypeId } from "../types";

// 「売上を逃しやすい瞬間」(仕様書20項)。
// メイン営業タイプ × 最も低い能力の組み合わせでコメントを出す。
// 未定義の組み合わせは能力別の一般コメント(GENERIC_BY_ABILITY)で代替する。
// 後から組み合わせを追加しやすいよう Map ではなくプレーンオブジェクトのテーブルにしている。

type ComboKey = `${SalesTypeId}:${AbilityKey}`;

const COMBO_COMMENTS: Partial<Record<ComboKey, string>> = {
  "empathyConsultant:decisionSupport":
    "お客様との関係を大切にするあまり、最後に踏み込むことで関係が悪くなることを無意識に避けている可能性があります。あなたの場合、強いクロージングを覚える必要はありません。「決めてもらう」のではなく、「決められない理由を一緒に整理する」ことを意識しましょう。",
  "empathyConsultant:problemFinding":
    "相手の気持ちを尊重できることは強みですが、踏み込んだ質問を遠慮して、表面的なニーズで商談が終わる可能性があります。信頼関係は、深い質問をするための土台として活用しましょう。",
  "breakthroughAction:listening":
    "行動力と商談を前に進める力はあなたの武器です。一方で、答えを早く出そうとすることで、お客様自身が話す前に解決策を提示してしまう可能性があります。次回は「提案したくなった瞬間に、もう一問聞く」をルールにしてください。",
  "strategicProposer:listening":
    "説明や提案を組み立てる力が高い一方で、良い提案を作ろうとするほど、自分の中で答えを作ってしまう可能性があります。提案精度を上げる一番の近道は、説明を増やすことではなく聞く情報を増やすことです。",
  "problemFinder:proposalDesign":
    "課題を見つける力はありますが、その課題と商品・サービスのつながりを相手が理解できていない可能性があります。「なぜこの提案なのか」を一文で伝える練習をしてください。",
  "decisionLeader:customerOrientation":
    "商談を前に進める力は強みです。一方、成果を急ぐほど相手の意思決定スピードより先に進んでしまう可能性があります。「今決めるべきか」も含めて一緒に整理することを意識してください。",
  "adaptiveAllRounder:actionImprovement":
    "相手に合わせる力は高い一方で、毎回違うやり方になることで、自分の成功パターンが整理されていない可能性があります。商談後に「なぜ今日はうまくいったのか」を一つ記録してください。",
};

const GENERIC_BY_ABILITY: Record<AbilityKey, string> = {
  relationship: "警戒心が解けないまま話が進んでしまい、本音を聞けずに商談が終わってしまうことがあります。",
  listening: "相手の話を最後まで聞く前に自分の考えを話し始めてしまい、本当のニーズを取りこぼす可能性があります。",
  problemFinding: "表面的な要望だけで話を進めてしまい、本質的な課題が提案に反映されないことがあります。",
  proposalDesign: "良い提案内容でも、相手に伝わる形に整理できず、魅力が十分に伝わらないことがあります。",
  adaptability: "相手のタイプに関わらず同じ説明をしてしまい、響く人にしか響かない商談になりがちです。",
  decisionSupport: "背中を押すタイミングを逃し、「検討します」のまま商談が止まってしまうことがあります。",
  customerOrientation: "目標達成を優先するあまり、相手にとって本当に必要な提案から離れてしまうことがあります。",
  actionImprovement: "同じ改善をしないまま次の商談に臨んでしまい、成果が安定しないことがあります。",
};

export function getMissedOpportunityComment(mainType: SalesTypeId, lowestAbility: AbilityKey): string {
  const key: ComboKey = `${mainType}:${lowestAbility}`;
  return COMBO_COMMENTS[key] ?? GENERIC_BY_ABILITY[lowestAbility];
}
