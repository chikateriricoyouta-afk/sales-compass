import { ABILITY_LABELS, type AbilityKey } from "../types";

// 「強い能力 × 伸ばす能力」の組み合わせフィードバック。
// メイン診断結果画面で、最もスコアが高い能力(強み)と最もスコアが低い能力(伸ばす力)の
// 組み合わせから「あなたは○○が強い。だから△△をこう伸ばす」という文章を生成する。
// 主要な組み合わせを個別に定義し、未定義の組み合わせは末尾の汎用テンプレートで代替する
// (後から組み合わせを追加しやすいよう Map ではなくプレーンオブジェクトのテーブルにしている)。

type ComboKey = `${AbilityKey}:${AbilityKey}`; // `${強み}:${伸ばす力}`

const ABILITY_COMBO_FEEDBACK: Partial<Record<ComboKey, string>> = {
  "relationship:problemFinding":
    "あなたの場合、相手との関係を作るところまでは非常に強い一方、その関係性を使って課題の核心まで踏み込めていない可能性があります。信頼関係はすでにあなたの武器です。次はその信頼を「深い質問をするための土台」として使ってみましょう。",
  "relationship:decisionSupport":
    "信頼関係を築く力がある一方、最後の一歩を踏み込むことにためらいが出やすいタイプです。関係を壊す心配はいりません。「決めてもらう」のではなく「決められない理由を一緒に整理する」ことを意識しましょう。",
  "relationship:proposalDesign":
    "安心して話してもらえる関係は作れる一方、そこから提案に落とし込む設計力にまだ伸びしろがあります。聞いた話の中の言葉を、提案の最初の一文に必ず入れてみましょう。",
  "listening:proposalDesign":
    "話を聞く力は高い一方、聞いた内容を提案に落とし込む整理力にまだ伸びしろがあります。ヒアリングした内容を、提案の冒頭で一言引用することから始めてみましょう。",
  "listening:decisionSupport":
    "相手の話を丁寧に聞ける一方、最後の意思決定を後押しする場面で遠慮が出やすい傾向があります。「検討します」と言われたら、何を検討するのか一つだけ確認してみましょう。",
  "proposalDesign:listening":
    "説明・提案を組み立てる力が高い一方、聞く量が不足しがちです。良い提案を作ろうとするほど、質問より先に答えを用意してしまう傾向があります。提案の前に、意識してもう一問質問を増やしてみましょう。",
  "actionImprovement:listening":
    "行動して改善する力は高い一方、相手の話を最後まで聞き切る前に次の行動へ移ってしまうことがあります。「聞き切ってから動く」を意識すると、行動の精度がさらに上がります。",
  "decisionSupport:customerOrientation":
    "商談を前に進める力は高い一方、成果を急ぐあまり相手のペースより先に進んでしまうことがあります。「今決めるべきか」も含めて一緒に考える姿勢を持つと、信頼がさらに高まります。",
  "adaptability:actionImprovement":
    "相手に合わせて柔軟に対応できる一方、毎回のやり方を振り返って蓄積することが少ない可能性があります。商談後に「今日うまくいった理由」を一つ記録する習慣をつけましょう。",
  "customerOrientation:proposalDesign":
    "顧客本位の姿勢は強みですが、その想いを提案として的確に形にする力にまだ伸びしろがあります。「なぜこの提案なのか」を一文で言語化する練習をしましょう。",
  "problemFinding:decisionSupport":
    "課題を見つける力は高い一方、見つけた課題を意思決定につなげるところで足踏みしやすい傾向があります。課題を提示した後、「これについてどう思われますか？」と一歩踏み込んでみましょう。",
};

const GENERIC_COMBO_TEMPLATE = (highLabel: string, lowLabel: string) =>
  `${highLabel}が強みである一方、${lowLabel}にはまだ伸びしろがあります。${highLabel}はすでにあなたの武器なので、無理に変える必要はありません。その武器を土台にしながら、${lowLabel}を意識的に使う場面を一つ増やしてみましょう。`;

export function getAbilityComboFeedback(strongAbility: AbilityKey, growthAbility: AbilityKey): string {
  // 全能力が同点の場合の保険。ここでも「自分で選んでください」で終わらせず、
  // 必ず1つの行動に絞って提示する(通常は scoring.ts の同点優先順位で別々の能力になる)。
  if (strongAbility === growthAbility) {
    return `現時点では、どの能力も突出して高くも低くもないバランス型です。この状態から一番成果が変わるのは、商談の最後です。次の商談では「検討します」で終わらせず、引っかかっている点を一つだけ確認することから始めてください。`;
  }
  const key: ComboKey = `${strongAbility}:${growthAbility}`;
  return (
    ABILITY_COMBO_FEEDBACK[key] ??
    GENERIC_COMBO_TEMPLATE(ABILITY_LABELS[strongAbility], ABILITY_LABELS[growthAbility])
  );
}
