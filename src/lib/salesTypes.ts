import type { AbilityScores, SalesTypeId } from "./types";

export interface SalesTypeAccent {
  /** アイコンバッジ背景などに使うグラデーション */
  gradient: string;
  /** カード背景など淡い塗り */
  soft: string;
  /** 見出し等の文字色 */
  text: string;
  /** 枠線・リング色 */
  ring: string;
}

export interface SalesTypeDef {
  id: SalesTypeId;
  name: string;
  catch: string;
  description: string;
  strength: string;
  caution: string;
  accent: SalesTypeAccent;
  /** タイプスコアの算出式(既存のVer.0.1から変更していない) */
  computeScore: (a: AbilityScores) => number;
}

export const SALES_TYPES: Record<SalesTypeId, SalesTypeDef> = {
  empathyConsultant: {
    id: "empathyConsultant",
    name: "共感コンサル型",
    catch: "信頼から商談を動かす営業",
    description:
      "相手との関係を大切にし、安心して話してもらえる環境を作ることが得意なタイプです。一方で関係を壊したくない気持ちが強くなると、課題を深く聞いたり、最後の意思決定を促したりする場面で遠慮が出ることがあります。",
    strength: "相手に安心感を与え、本音を話してもらえる関係を作りやすい。",
    caution: "人間関係を大切にするあまり、踏み込んだ質問や意思決定支援を避ける可能性がある。",
    accent: {
      gradient: "from-indigo-500 to-blue-500",
      soft: "bg-indigo-50",
      text: "text-indigo-700",
      ring: "ring-indigo-100",
    },
    computeScore: (a) => (a.relationship + a.customerOrientation + a.listening) / 3,
  },
  problemFinder: {
    id: "problemFinder",
    name: "信頼築き型",
    catch: "誠実な問いかけで、じっくり信頼を築く営業",
    description:
      "焦らず質問を重ね、相手が安心して話せる関係を積み重ねながら、表面的な要望の奥にある本当の課題にたどり着くことが得意なタイプです。一方で質問が多くなりすぎると、相手には尋問のように感じられてしまうことがあります。",
    strength: "誠実に聞き続けることで信頼を積み重ね、本当の課題を見つけることが得意。",
    caution: "質問が多くなりすぎると、尋問のように感じられる可能性がある。",
    accent: {
      gradient: "from-amber-700 to-orange-500",
      soft: "bg-amber-50",
      text: "text-amber-800",
      ring: "ring-amber-100",
    },
    computeScore: (a) => (a.listening + a.problemFinding) / 2,
  },
  strategicProposer: {
    id: "strategicProposer",
    name: "戦略提案型",
    catch: "整理と提案設計で納得を作る営業",
    description:
      "情報を整理し、顧客に合った提案を論理的に組み立てることが得意なタイプです。一方で説明が上手な分、顧客が話す時間より自分が説明する時間が長くなってしまうことがあります。",
    strength: "情報を整理し、顧客に合った提案を論理的に組み立てることが得意。",
    caution: "説明が上手な分、顧客が話す時間より自分が説明する時間が長くなる可能性がある。",
    accent: {
      gradient: "from-violet-500 to-purple-500",
      soft: "bg-violet-50",
      text: "text-violet-700",
      ring: "ring-violet-100",
    },
    computeScore: (a) => (a.problemFinding + a.proposalDesign) / 2,
  },
  breakthroughAction: {
    id: "breakthroughAction",
    name: "チャレンジ開拓型",
    catch: "行動と改善でチャンスを広げる営業",
    description:
      "行動量、スピード、試行錯誤で結果を作ることが得意なタイプです。一方で結果を急ぐと、顧客が十分に考える前に先へ進めてしまうことがあります。",
    strength: "行動量、スピード、試行錯誤で結果を作ることが得意。",
    caution: "結果を急ぐと、顧客が十分に考える前に先へ進めてしまう可能性がある。",
    accent: {
      gradient: "from-lime-600 to-emerald-500",
      soft: "bg-lime-50",
      text: "text-emerald-700",
      ring: "ring-lime-100",
    },
    computeScore: (a) => (a.actionImprovement + a.decisionSupport) / 2,
  },
  decisionLeader: {
    id: "decisionLeader",
    name: "即決リード型",
    catch: "迷いを整理し、意思決定を前に進める営業",
    description:
      "顧客の迷いを整理して、次の行動へスピーディーに進めることが得意なタイプです。一方で決断を促す力が強すぎると、相手によってはプレッシャーを感じることがあります。",
    strength: "顧客の迷いを整理して、次の行動へ進めることが得意。",
    caution: "決断を促す力が強すぎると、相手によってはプレッシャーを感じる。",
    accent: {
      gradient: "from-blue-600 to-teal-500",
      soft: "bg-blue-50",
      text: "text-blue-700",
      ring: "ring-blue-100",
    },
    computeScore: (a) => (a.decisionSupport + a.proposalDesign) / 2,
  },
  adaptiveAllRounder: {
    id: "adaptiveAllRounder",
    name: "提案パートナー型",
    catch: "相手と一緒に考え、選択肢を示せる営業",
    description:
      "相手の性格・知識・反応に合わせて柔軟に営業方法を変えられるタイプです。一方で相手に合わせすぎることで、自分から商談をリードできなくなる場合があります。",
    strength: "相手の性格・知識・反応に合わせて営業方法を変えられる。",
    caution: "相手に合わせすぎることで、自分から商談をリードできなくなる場合がある。",
    accent: {
      gradient: "from-orange-400 to-fuchsia-400",
      soft: "bg-orange-50",
      text: "text-orange-700",
      ring: "ring-orange-100",
    },
    computeScore: (a) => {
      const values = Object.values(a) as number[];
      const max = Math.max(...values);
      const min = Math.min(...values);
      const bonusEligible = a.adaptability >= 75 && max - min <= 25;
      return bonusEligible ? a.adaptability + 5 : a.adaptability;
    },
  },
};

export const SALES_TYPE_ORDER: SalesTypeId[] = [
  "empathyConsultant",
  "problemFinder",
  "strategicProposer",
  "breakthroughAction",
  "decisionLeader",
  "adaptiveAllRounder",
];
