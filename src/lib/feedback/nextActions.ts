import type { AbilityKey } from "../types";

// 「次の商談でやること3つ」(Ver.1)。抽象的な助言ではなく、
// 「実際に何をするか・何と言うか」まで具体化したスクリプトとして生成する。
//
// 構成:
//   ① 相手を深掘りする質問  : 最もスコアが低い能力(ability #1)に関する一手
//   ② 次の具体的行動を決める: 2番目にスコアが低い能力(ability #2)に関する締めの一手
//   ③ 商談後30秒で振り返る : 誰にでも使える固定の振り返り習慣

export interface NextAction {
  step: number;
  heading: string;
  action: string;
  scripts: string[];
}

interface AbilityScript {
  action: string;
  scripts: string[];
}

// ability #1(最も低い能力)を掘り下げるための一手
const DEEPEN_SCRIPTS: Record<AbilityKey, AbilityScript> = {
  relationship: {
    action: "本題に入る前に、相手自身について一つ質問してから話し始める。",
    scripts: ["「最近どうですか？」", "「今日はどちらからいらっしゃったんですか？」"],
  },
  listening: {
    action: "相手が話し終えるまで、自分の説明を差し込まずに最後まで聞く。",
    scripts: ["「なるほど、もう少し詳しく聞かせてもらえますか？」"],
  },
  problemFinding: {
    action: "相手が話した内容について、最低1回は理由や影響まで追加質問する。",
    scripts: ["「それはなぜですか？」", "「それによって何が一番困りますか？」"],
  },
  proposalDesign: {
    action: "提案の最初に、相手の言葉を引用してから理由を伝える。",
    scripts: ["「先ほど○○とおっしゃっていたので、今回はこの点についてご提案します」"],
  },
  adaptability: {
    action: "説明の前に、相手がどのくらい知っているかを確認する。",
    scripts: ["「差し支えなければ、どのくらいご存じか教えていただけますか？」"],
  },
  decisionSupport: {
    action: "「検討します」で終わらせず、どの部分を一番検討したいのか1回質問する。",
    scripts: ["「ちなみに、どの部分を一番検討したいと感じていますか？」"],
  },
  customerOrientation: {
    action: "提案の前に、この人に今本当に必要なことは何かを自分の中で確認する。",
    scripts: ["「率直に伺いたいのですが、今一番優先したいことは何ですか？」"],
  },
  actionImprovement: {
    action: "商談の中で気になった相手の反応を、その場で一つメモしておく。",
    scripts: ["(心の中で)「今の反応、あとで振り返ろう」"],
  },
};

// ability #2(2番目に低い能力)に関する、次の具体的行動を決める一手
const CLOSING_SCRIPTS: Record<AbilityKey, AbilityScript> = {
  relationship: {
    action: "商談終了前に、次回も関係を続けるための具体的な行動を1つ決める。",
    scripts: ["「次回はもう少し○○についても伺えたら嬉しいです」"],
  },
  listening: {
    action: "商談終了前に、相手が話した内容を自分の言葉で要約して確認する。",
    scripts: ["「今日伺った内容を整理すると、○○ということですね」"],
  },
  problemFinding: {
    action: "商談終了前に、見えてきた課題を一文で確認する。",
    scripts: ["「つまり、○○が今の課題ということですね」"],
  },
  proposalDesign: {
    action: "商談終了前に、提案理由を一文で言い直して締める。",
    scripts: ["「今回の提案は、○○のためのものです」"],
  },
  adaptability: {
    action: "商談終了前に、相手に合わせて工夫した点を自分の中で振り返る。",
    scripts: ["(心の中で)「今日は○○を意識して話し方を変えてみよう」"],
  },
  decisionSupport: {
    action: "商談終了前に、次回面談・資料確認・社内相談など「次の具体的行動」を1つ決める。",
    scripts: ["「では次回までに、誰が・何を確認するか決めておきましょう」"],
  },
  customerOrientation: {
    action: "商談終了前に、今回の話が相手にとって本当に役立ったかを一言確認する。",
    scripts: ["「今日の内容は、お役に立てそうですか？」"],
  },
  actionImprovement: {
    action: "商談終了前に、次回試したい改善点を自分の中で一つ決めておく。",
    scripts: ["(心の中で)「次はここを試してみよう」"],
  },
};

// ③ 商談後30秒で振り返る(固定・誰にでも使える習慣)
const REFLECTION_STEP: AbilityScript = {
  action: "商談終了後30秒で、「今日、一番相手が反応した質問」を1つ記録する。",
  scripts: ["メモ例:「今日一番反応が良かった質問は〇〇だった」"],
};

/**
 * abilitiesAscending: スコアが低い順に並べた能力キー配列(先頭が最も低い)。
 */
export function getNextActions(abilitiesAscending: AbilityKey[]): NextAction[] {
  const [lowest, secondLowest] = abilitiesAscending;
  const deepen = DEEPEN_SCRIPTS[lowest];
  const closing = CLOSING_SCRIPTS[secondLowest ?? lowest];

  return [
    { step: 1, heading: "① 相手を深掘りする質問", action: deepen.action, scripts: deepen.scripts },
    { step: 2, heading: "② 次の具体的行動を決める", action: closing.action, scripts: closing.scripts },
    { step: 3, heading: "③ 商談後30秒で振り返る", action: REFLECTION_STEP.action, scripts: REFLECTION_STEP.scripts },
  ];
}
