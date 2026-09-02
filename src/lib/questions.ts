import type { Question } from "./types";

// 48問。各能力6問、末尾(6問目)が逆転項目。
// 質問文・順序・逆転指定は仕様書のQ1〜Q48をそのまま反映している。
export const QUESTIONS: Question[] = [
  // 関係構築力 Q1-6
  { id: 1, ability: "relationship", text: "初対面でも相手が話しやすい雰囲気を作れる。", reverse: false },
  { id: 2, ability: "relationship", text: "商品の話をする前に、相手自身について知ろうとする。", reverse: false },
  { id: 3, ability: "relationship", text: "相手の表情や反応から、警戒や安心の変化に気づける。", reverse: false },
  { id: 4, ability: "relationship", text: "売ることを急がず、信頼関係を作る時間を取れる。", reverse: false },
  { id: 5, ability: "relationship", text: "相手との共通点や関心事を自然に見つけられる。", reverse: false },
  { id: 6, ability: "relationship", text: "商談相手との距離を縮めるのは苦手だ。", reverse: true },

  // ヒアリング力 Q7-12
  { id: 7, ability: "listening", text: "相手が話しているとき、次に自分が何を話すかを考えるより、まず相手の話を最後まで聞くことができる。", reverse: false },
  { id: 8, ability: "listening", text: "「なぜそう思ったのですか？」など、追加の質問ができる。", reverse: false },
  { id: 9, ability: "listening", text: "相手の話を聞いた後、「つまり〇〇ということですね」と自分の言葉で確認している。", reverse: false },
  { id: 10, ability: "listening", text: "相手が何を重視しているかを会話から把握できる。", reverse: false },
  { id: 11, ability: "listening", text: "想定外の話が出ても、興味を持って掘り下げられる。", reverse: false },
  { id: 12, ability: "listening", text: "相手が話していても、次に自分が何を話すか考えてしまう。", reverse: true },

  // 課題発見力 Q13-18
  { id: 13, ability: "problemFinding", text: "お客様から「これが欲しい・必要」と言われたとき、その理由やきっかけまで確認している。", reverse: false },
  { id: 14, ability: "problemFinding", text: "現状だけでなく、「このままだとどうなるか」まで聞く。", reverse: false },
  { id: 15, ability: "problemFinding", text: "質問を重ねることで、相手が最初は気づいていなかった課題や不安が明らかになることがある。", reverse: false },
  { id: 16, ability: "problemFinding", text: "問題が起きている原因まで質問する。", reverse: false },
  { id: 17, ability: "problemFinding", text: "相手が「こうなりたい」と考えている状態と、現在の状況との違いを整理して確認できる。", reverse: false },
  { id: 18, ability: "problemFinding", text: "相手が「特に困っていない」と言えば、それ以上聞かない。", reverse: true },

  // 提案設計力 Q19-24
  { id: 19, ability: "proposalDesign", text: "提案する理由を相手の課題と結びつけて説明できる。", reverse: false },
  { id: 20, ability: "proposalDesign", text: "商品の特徴を説明するだけでなく、それによって相手にどんなメリットがあるのかまで伝えている。", reverse: false },
  { id: 21, ability: "proposalDesign", text: "情報を整理して、分かりやすい順番で説明できる。", reverse: false },
  { id: 22, ability: "proposalDesign", text: "相手が比較しやすいように選択肢を整理できる。", reverse: false },
  { id: 23, ability: "proposalDesign", text: "相手から聞いた言葉を提案内容に反映できる。", reverse: false },
  { id: 24, ability: "proposalDesign", text: "良い商品なら、詳しく説明すれば自然に売れると思う。", reverse: true },

  // 適応力 Q25-30
  { id: 25, ability: "adaptability", text: "相手の性格によって話し方を変えている。", reverse: false },
  { id: 26, ability: "adaptability", text: "相手の知識量によって説明の詳しさを変えられる。", reverse: false },
  { id: 27, ability: "adaptability", text: "相手の反応が悪ければ、商談の進め方を途中で変更できる。", reverse: false },
  { id: 28, ability: "adaptability", text: "相手が理由や数字を知りたそうか、気持ちに共感してほしそうかを感じ取り、説明の仕方を変えている。", reverse: false },
  { id: 29, ability: "adaptability", text: "商談前に、相手に合いそうな進め方を考える。", reverse: false },
  { id: 30, ability: "adaptability", text: "自分の営業スタイルは基本的に誰に対しても同じだ。", reverse: true },

  // 決断支援力 Q31-36
  { id: 31, ability: "decisionSupport", text: "相手が迷っている理由を具体的に確認できる。", reverse: false },
  { id: 32, ability: "decisionSupport", text: "「検討します」で終わらず、何を検討するのか確認する。", reverse: false },
  { id: 33, ability: "decisionSupport", text: "相手に無理強いせず、次の行動を明確にできる。", reverse: false },
  { id: 34, ability: "decisionSupport", text: "決断できない原因を一緒に整理できる。", reverse: false },
  { id: 35, ability: "decisionSupport", text: "商談の最後に、次回・契約などの具体的な約束を取れる。", reverse: false },
  { id: 36, ability: "decisionSupport", text: "断られるのが嫌で、最後の一歩を踏み込めないことがある。", reverse: true },

  // 顧客志向 Q37-42
  { id: 37, ability: "customerOrientation", text: "自分の商品が合わない場合は、無理に勧めない。", reverse: false },
  { id: 38, ability: "customerOrientation", text: "売上よりも長期的な顧客との関係を重視できる。", reverse: false },
  { id: 39, ability: "customerOrientation", text: "自社の商品よりお客様に合う方法がある場合、それを正直に伝えている。", reverse: false },
  { id: 40, ability: "customerOrientation", text: "契約後に顧客がどうなるかまで考えて提案する。", reverse: false },
  { id: 41, ability: "customerOrientation", text: "商品を売り込む前に、まず相手が今困っていることは何かを考えている。", reverse: false },
  { id: 42, ability: "customerOrientation", text: "目標達成が厳しいと、顧客ニーズより契約を優先したくなる。", reverse: true },

  // 行動・改善力 Q43-48
  { id: 43, ability: "actionImprovement", text: "自分の商談を振り返る習慣がある。", reverse: false },
  { id: 44, ability: "actionImprovement", text: "失注した理由を考え、次の商談で試す。", reverse: false },
  { id: 45, ability: "actionImprovement", text: "営業成績を感覚だけでなく数字で確認している。", reverse: false },
  { id: 46, ability: "actionImprovement", text: "上手な営業担当者のやり方を観察して取り入れる。", reverse: false },
  { id: 47, ability: "actionImprovement", text: "苦手な営業行動でも、必要なら練習できる。", reverse: false },
  { id: 48, ability: "actionImprovement", text: "成績が悪いときも、営業方法をあまり変えない。", reverse: true },
];
