import type { AbilityKey } from "../types";

// 「次の商談でやること3つ」(Ver.1)。抽象的な助言ではなく、
// 「実際に何をするか・何と言うか」まで具体化したスクリプトとして生成する。
//
// 構成:
//   ① 相手を深掘りする質問  : 最もスコアが低い能力(ability #1)に関する一手
//   ② 次の具体的行動を決める: 2番目にスコアが低い能力(ability #2)に関する締めの一手
//   ③ 商談後30秒で振り返る : 誰にでも使える固定の振り返り習慣
//
// スクリプト設計の方針(教科書的な一般論を避け、実際の商談で機能する型だけを使う):
//   1. 断る許可を先に渡す      → 相手の緊張が解けて本音が出る
//   2. 二択で聞く              → オープンな質問より答えやすく、違えば相手が自分で訂正してくれる
//   3. 相手の言葉をそのまま引用 → 「聞いてくれている」が伝わり、相手が自分から話を広げる
//   4. 「なぜ」を「いつ・誰が」に置き換える → 詰問にならず、原因と緊急度が同時に出る

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
  // 関係構築力が低い人に必要なのは、その場の話術ではなく事前準備。
  // 「今日は何を話しましょうか」と相手に考えさせる質問は、準備していないことを露呈するため使わない。
  relationship: {
    action: "商談前に相手の会社や人について一つ調べておき、その具体的な話から入る。",
    scripts: [
      "「事前に◯◯を拝見したのですが、△△に力を入れていらっしゃるんですね。そのあたりは今、どんな状況なんですか?」",
      "(事前情報がない場合)「お電話で『◯◯が気になる』とおっしゃっていたので、今日はそこを中心にお持ちしました」",
    ],
  },
  listening: {
    action: "自分の説明を差し込まずに聞き切り、相手が使った言葉をそのまま引用して深掘りする。",
    scripts: [
      "「すみません、今の『◯◯』というお話、大事だと思ったのでメモさせてください。もう少し伺ってもいいですか?」",
    ],
  },
  problemFinding: {
    action: "「なぜ」と聞く代わりに、いつからそうなのか・誰が困るのかを確認する。",
    scripts: [
      "「それは、いつ頃からそう感じられるようになったんですか?」",
      "「それが今のまま続くと、一番困るのはどなたですか?」",
    ],
  },
  proposalDesign: {
    action: "提案の冒頭で相手の言葉を引用し、そこに絞って持ってきたことを明言する。",
    scripts: ["「◯◯とおっしゃっていたので、今日は他の話は省いて、その1点に絞ってお持ちしました」"],
  },
  adaptability: {
    action: "説明を始める前に、相手がいつでも説明を止められる許可を渡しておく。",
    scripts: ["「この辺りはもうご存じかもしれないので、『それは知ってる』と思ったら遠慮なく止めてください」"],
  },
  decisionSupport: {
    action: "「検討します」で終わらせず、引っかかっている点を二択にして確認する。",
    scripts: ["「もし今回見送るとしたら、引っかかるのは費用面ですか?それとも、タイミングの方ですか?」"],
  },
  customerOrientation: {
    action: "提案を始める前に、社内で実際に問題になっていることを一つ聞く。",
    scripts: ["「今、社内で一番『これは何とかしないと』と言われているのは、どんなことですか?」"],
  },
  actionImprovement: {
    action: "商談の中で、相手が一番反応した部分を本人から聞き出して記録する。",
    scripts: ["「今日の話の中で、一番『そうそう』と感じられたのはどの部分でしたか?」"],
  },
};

// ability #2(2番目に低い能力)に関する、次の具体的行動を決める一手
const CLOSING_SCRIPTS: Record<AbilityKey, AbilityScript> = {
  relationship: {
    action: "商談終了前に、売り込み以外の理由で次に連絡する約束を1つ作る。",
    scripts: ["「今日伺った◯◯の件、少し調べてまたご連絡してもいいですか?」"],
  },
  listening: {
    action: "商談終了前に、聞いた内容を要約し、ズレていないか相手に確認してもらう。",
    scripts: ["「今日伺った内容を整理すると◯◯ですが、ズレていませんか?」"],
  },
  problemFinding: {
    action: "商談終了前に、出てきた課題の優先順位を相手に決めてもらう。",
    scripts: ["「今日出てきた課題の中で、一番先に手をつけるとしたらどれですか?」"],
  },
  proposalDesign: {
    action: "商談終了前に、提案を一言に要約し、社内で説明するための言葉として渡す。",
    scripts: [
      "「今回のご提案を一言でいうと『◯◯』です。社内で説明されるときは、そう言っていただければ伝わると思います」",
    ],
  },
  adaptability: {
    action: "商談終了前に、説明の粒度が相手に合っていたかを確認する。",
    scripts: ["「今日の説明、詳しすぎませんでしたか?次回は◯◯さんに合わせて調整します」"],
  },
  decisionSupport: {
    action: "商談終了前に、決断ではなく「次に必要な手続き」を確認する。",
    scripts: ["「次に進むとしたら、どなたの確認が必要になりますか?」"],
  },
  customerOrientation: {
    action: "商談終了前に、相手が社内に持ち帰る部分を具体的に聞く。",
    scripts: ["「今日の話の中で、社内で共有するとしたらどの部分になりそうですか?」"],
  },
  actionImprovement: {
    action: "商談終了前に、自分の説明で分かりにくかった点を顧客から教えてもらう。",
    scripts: ["「差し支えなければ、今日の私の説明で分かりにくかったところを教えていただけますか?」"],
  },
};

// ③ 商談後30秒で振り返る(固定・誰にでも使える習慣)
const REFLECTION_STEP: AbilityScript = {
  action: "商談終了後30秒で、「今日、相手が一番前のめりになった瞬間」を1つ記録する。",
  scripts: ["メモ例:「今日一番反応が良かったのは、◯◯を聞いたときだった」"],
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
