import type { SalesTypeId } from "../types";

// 「相性のいい顧客タイプ」。
// 48問の回答から年齢・性別などを断定するのではなく、営業行動との相性を説明しやすい
// 6つの「顧客タイプ」を定義し、営業タイプごとに相性を表す。
// あくまで自己回答をもとにした営業行動傾向であり、「必ず売れる」等の断定は行わない。

export const CUSTOMER_TYPE_IDS = [
  "cautious",
  "logical",
  "speed",
  "coPilot",
  "trustFirst",
  "challenge",
] as const;

export type CustomerTypeId = (typeof CUSTOMER_TYPE_IDS)[number];

export const CUSTOMER_TYPE_LABELS: Record<CustomerTypeId, string> = {
  cautious: "じっくり相談したい慎重派",
  logical: "数字や根拠を重視する論理派",
  speed: "結論を早く知りたいスピード派",
  coPilot: "相談しながら決めたい伴走希望型",
  trustFirst: "担当者への信頼を重視する関係重視型",
  challenge: "新しい提案を楽しむチャレンジ型",
};

export interface CustomerTypeCard {
  id: CustomerTypeId;
  reason: string; // 相性が良い/工夫が必要になりやすい理由
  approach: string; // おすすめの接し方
  script: string; // 実際に使える一言
}

export interface CustomerTypeAffinity {
  /** 力を発揮しやすい顧客タイプ TOP3(優先順) */
  strongTypes: CustomerTypeCard[];
  /** 少し工夫すると成果につながりやすい顧客タイプ(1件) */
  growthType: CustomerTypeCard;
}

export const CUSTOMER_TYPE_AFFINITY: Record<SalesTypeId, CustomerTypeAffinity> = {
  empathyConsultant: {
    strongTypes: [
      {
        id: "cautious",
        reason: "じっくり話を聞く姿勢が、時間をかけて考えたい慎重派の安心感につながります。",
        approach: "急かさず、相手のペースに合わせて商談を進めましょう。",
        script: "「焦らなくて大丈夫です。気になる点があれば、いつでも聞いてください」",
      },
      {
        id: "trustFirst",
        reason: "本音を引き出す関係構築力が、担当者への信頼を重視する方にぴったりです。",
        approach: "商品の前に、まず自分自身を知ってもらう時間を大切にしましょう。",
        script: "「本題の前に、少し自己紹介させてください」",
      },
      {
        id: "coPilot",
        reason: "一緒に考える丁寧な姿勢が、伴走してほしい方に響きます。",
        approach: "相手の意見を引き出しながら、一緒に選択肢を整理しましょう。",
        script: "「一緒に整理しながら進めていきましょう」",
      },
    ],
    growthType: {
      id: "speed",
      reason: "じっくり関係を築くことを大切にする分、早く結論を知りたい相手には、話が長く感じられてしまうことがあります。",
      approach: "最初に結論やゴールを一言で伝えてから、丁寧な説明に入りましょう。",
      script: "「結論からお伝えすると〇〇です。理由も簡単にご説明しますね」",
    },
  },
  adaptiveAllRounder: {
    strongTypes: [
      {
        id: "coPilot",
        reason: "相手に合わせて一緒に考える柔軟さが、伴走ニーズと相性抜群です。",
        approach: "相手の反応を見ながら、進め方をその場で調整しましょう。",
        script: "「どちらの進め方が話しやすいですか？」",
      },
      {
        id: "challenge",
        reason: "新しい提案を柔軟に示せる力が、挑戦好きな方に刺さります。",
        approach: "複数の選択肢を用意し、一緒に選んでもらいましょう。",
        script: "「新しい選択肢もいくつかご用意しています」",
      },
      {
        id: "cautious",
        reason: "相手のペースに合わせられるので、慎重派にも安心感を与えられます。",
        approach: "説明の詳しさを相手の反応に合わせて調整しましょう。",
        script: "「ここまでで分かりにくい点はありませんか？」",
      },
    ],
    growthType: {
      id: "logical",
      reason: "相手に合わせて柔軟に対応する分、数字や根拠を軸に一貫した説明を求める相手には、裏付けが弱く感じられてしまうことがあります。",
      approach: "提案の前に、判断材料となる数字やデータを1つ用意しておきましょう。",
      script: "「数字で見ると〇〇です。この根拠をもとにご提案します」",
    },
  },
  strategicProposer: {
    strongTypes: [
      {
        id: "logical",
        reason: "論理的な提案設計が、根拠を重視する方の納得感を生みます。",
        approach: "データや実績を示しながら、筋道立てて説明しましょう。",
        script: "「データで見ると、こういう結果になっています」",
      },
      {
        id: "speed",
        reason: "整理された提案でスムーズに結論へ導けます。",
        approach: "結論から先に伝え、詳細は後から補足しましょう。",
        script: "「結論から言うと〇〇です」",
      },
      {
        id: "challenge",
        reason: "戦略的な視点が、新しい挑戦を後押しします。",
        approach: "新しい選択肢のメリットを論理的に示しましょう。",
        script: "「この新しい方法なら、こういうメリットがあります」",
      },
    ],
    growthType: {
      id: "trustFirst",
      reason: "論理的な提案に力を入れる分、まず人としての信頼関係を大事にしたい相手には、機械的な印象を与えてしまうことがあります。",
      approach: "提案の前に、少し相手自身の状況を伺う時間を取りましょう。",
      script: "「本題の前に、少し状況を伺ってもよろしいですか？」",
    },
  },
  decisionLeader: {
    strongTypes: [
      {
        id: "speed",
        reason: "テンポの良い商談運びが、スピード重視の方と好相性です。",
        approach: "要点を絞ってテンポよく進めましょう。",
        script: "「早速ですが、結論からお伝えしますね」",
      },
      {
        id: "challenge",
        reason: "前向きな後押しが、挑戦したい方の背中を押します。",
        approach: "「まずやってみる」提案で背中を押しましょう。",
        script: "「まずは小さく始めてみませんか？」",
      },
      {
        id: "logical",
        reason: "整理された提案が、論理的な判断を後押しします。",
        approach: "判断材料を簡潔に整理して提示しましょう。",
        script: "「判断材料を3つに整理しました」",
      },
    ],
    growthType: {
      id: "cautious",
      reason: "商談をテンポよく前進させる力がある分、時間をかけてじっくり考えたい相手には、急かされていると感じさせてしまうことがあります。",
      approach: "「今日決める必要はありません」と伝え、相手のペースを尊重しましょう。",
      script: "「今日は無理に決めなくて大丈夫です。次に何を確認できれば決めやすくなりそうですか？」",
    },
  },
  problemFinder: {
    strongTypes: [
      {
        id: "trustFirst",
        reason: "誠実に関係を築く姿勢が、信頼重視の方に安心感を与えます。",
        approach: "焦らず何度もやり取りを重ねて信頼を積み上げましょう。",
        script: "「じっくりお付き合いさせてください」",
      },
      {
        id: "cautious",
        reason: "焦らず話を聞く姿勢が、慎重派とじっくり向き合えます。",
        approach: "相手が納得するまで、丁寧に質問を重ねましょう。",
        script: "「他に気になる点はありませんか？」",
      },
      {
        id: "coPilot",
        reason: "一緒に課題を探る丁寧さが、伴走ニーズにマッチします。",
        approach: "相手と一緒に課題を言語化していきましょう。",
        script: "「一緒に整理してみましょう」",
      },
    ],
    growthType: {
      id: "speed",
      reason: "誠実に関係を積み重ねることを大切にする分、早く結論を知りたい相手には、話が長く感じられてしまうことがあります。",
      approach: "最初に「今日の結論」を一言添えてから、詳しい話に入りましょう。",
      script: "「今日お伝えしたい結論は〇〇です。詳しい背景もご説明しますね」",
    },
  },
  breakthroughAction: {
    strongTypes: [
      {
        id: "challenge",
        reason: "行動力と前向きさが、新しい挑戦を楽しむ方と好相性です。",
        approach: "新しい提案をポジティブに、テンポよく伝えましょう。",
        script: "「面白い提案があるので、聞いてもらえますか？」",
      },
      {
        id: "speed",
        reason: "フットワークの軽さが、スピード重視の方に刺さります。",
        approach: "すぐに動ける提案で、スピード感を伝えましょう。",
        script: "「今週中にも始められます」",
      },
      {
        id: "coPilot",
        reason: "一緒に試しながら進める姿勢が、伴走ニーズに合います。",
        approach: "小さく試しながら、一緒に進めましょう。",
        script: "「まず一緒に試してみましょう」",
      },
    ],
    growthType: {
      id: "logical",
      reason: "行動力とスピードで機会を広げる分、根拠やデータをじっくり確認したい相手には、勢いだけに見えてしまうことがあります。",
      approach: "提案の前に、実績や数字などの裏付けを1つ添えましょう。",
      script: "「実際に〇〇という実績があります。このデータをもとにご提案します」",
    },
  },
};
