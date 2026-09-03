"use client";

import { useState } from "react";
import { AbilityRadarChart } from "./AbilityRadarChart";
import { AbilityBars } from "./AbilityBars";
import { CharacterAvatar, HeroCharacter } from "./CharacterAvatar";
import { TypesShowcase } from "./TypesShowcase";
import { PageShell, PageCard, InfoBox } from "./PageCard";
import { GradientButton, SecondaryButton } from "./Button";
import { IconTarget, IconStar, IconMessage, IconHandshake, IconInfo, IconArrowRight } from "./Icons";
import { SALES_TYPES } from "@/lib/salesTypes";
import { abilitiesSortedAscending, abilitiesSortedDescending } from "@/lib/scoring";
import { INSURANCE_INDIVIDUAL_FEEDBACK } from "@/lib/feedback/insuranceIndividual";
import { INSURANCE_CORPORATE_FEEDBACK } from "@/lib/feedback/insuranceCorporate";
import { getMissedOpportunityComment } from "@/lib/feedback/missedOpportunity";
import { getNextActions } from "@/lib/feedback/nextActions";
import { getAbilityComboFeedback } from "@/lib/feedback/abilityCombos";
import { GROWTH_GOAL_PHRASE } from "@/lib/feedback/growthFocus";
import { CUSTOMER_TYPE_AFFINITY, CUSTOMER_TYPE_LABELS, type CustomerTypeCard } from "@/lib/feedback/customerTypes";
import { SaveTestResultForm } from "./SaveTestResultForm";
import { ABILITY_KEYS, ABILITY_LABELS, levelOf, type Answers, type DiagnosisResult } from "@/lib/types";

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-2xl font-bold text-indigo-700 sm:text-[1.75rem]">{title}</h2>
      {children}
    </section>
  );
}

const RANK_STYLES = [
  {
    badge: "bg-emerald-500",
    border: "border-emerald-300",
    bg: "bg-emerald-50/70",
    label: "text-emerald-700",
    medal: "🥇",
  },
  {
    badge: "bg-blue-500",
    border: "border-blue-300",
    bg: "bg-blue-50/70",
    label: "text-blue-700",
    medal: "🥈",
  },
  {
    badge: "bg-purple-500",
    border: "border-purple-300",
    bg: "bg-purple-50/70",
    label: "text-purple-700",
    medal: "🥉",
  },
] as const;

/** 顧客タイプ相性カード。rankを渡すと「力を発揮しやすい」TOP3用の順位バッジ付きになる */
function CustomerCard({ card, rank }: { card: CustomerTypeCard; rank?: 0 | 1 | 2 }) {
  const isGrowth = rank === undefined;
  const style = rank !== undefined ? RANK_STYLES[rank] : null;

  return (
    <div
      className={`relative rounded-2xl border-2 p-5 shadow-sm ${
        isGrowth ? "border-blue-300 bg-blue-50/70" : `${style!.border} ${style!.bg}`
      }`}
    >
      {rank !== undefined && (
        <div
          className={`absolute -left-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white shadow-md ${style!.badge}`}
        >
          {rank + 1}
        </div>
      )}
      <p className={`text-xl font-bold leading-snug ${isGrowth ? "text-blue-800" : style!.label} ${rank !== undefined ? "pl-4" : ""}`}>
        {rank !== undefined && <span className="mr-1">{style!.medal}</span>}
        {CUSTOMER_TYPE_LABELS[card.id]}
      </p>
      {isGrowth && (
        <span className="ml-0 mt-1 inline-block rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-bold text-white">
          成長チャンス
        </span>
      )}

      <div className="mt-3 flex items-start gap-2">
        <IconInfo className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
        <div>
          <p className="text-sm font-bold text-indigo-600">{isGrowth ? "①なぜ工夫が必要なのか" : "相性の理由"}</p>
          <p className="text-base leading-relaxed text-slate-800">{card.reason}</p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <IconHandshake className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
        <div>
          <p className="text-sm font-bold text-indigo-600">{isGrowth ? "②どう接するとよいか" : "おすすめの接し方"}</p>
          <p className="text-base leading-relaxed text-slate-800">{card.approach}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-indigo-600">
          <IconMessage className="h-4 w-4" /> {isGrowth ? "③実際に使える一言" : "実際に使える一言"}
        </p>
        <p className="rounded-xl border border-purple-100 bg-white px-3.5 py-3 text-base font-bold leading-relaxed text-slate-900 shadow-sm">
          {card.script}
        </p>
      </div>
    </div>
  );
}

/** ファーストビューの4項目を囲む共通カード。見出しに番号ラベルを付けて視線の順序を作る */
function SummaryBlock({
  label,
  title,
  accent,
  children,
}: {
  label: string;
  title: string;
  accent: "amber" | "blue" | "purple";
  children: React.ReactNode;
}) {
  const styles = {
    amber: { border: "border-amber-300", bg: "bg-amber-50/60", chip: "bg-amber-500", text: "text-amber-800" },
    blue: { border: "border-blue-300", bg: "bg-blue-50/60", chip: "bg-blue-500", text: "text-blue-800" },
    purple: { border: "border-purple-300", bg: "bg-purple-50/60", chip: "bg-purple-500", text: "text-purple-800" },
  }[accent];

  return (
    <div className={`rounded-2xl border-2 ${styles.border} ${styles.bg} p-5 shadow-sm sm:p-6`}>
      <div className="flex items-center gap-2.5">
        <span className={`rounded-full ${styles.chip} px-2.5 py-1 text-xs font-bold text-white`}>{label}</span>
        <p className={`text-lg font-bold ${styles.text} sm:text-xl`}>{title}</p>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function ResultView({
  result,
  answers,
  onRestart,
}: {
  result: DiagnosisResult;
  /** テスト結果保存機能用。48問の回答そのもの(未指定なら保存フォームは表示しない) */
  answers?: Answers;
  onRestart: () => void;
}) {
  // 結果画面は「10秒で4点(何型か・何が強いか・何を改善するか・次に何をするか)が分かること」を最優先し、
  // 詳細分析とテストアンケートはそれぞれ折りたたんで、ファーストビューの情報量を絞っている。
  const [showDetail, setShowDetail] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const { profile, abilityScores, overallScore, typeResult } = result;
  const mainType = SALES_TYPES[typeResult.mainType];
  const subType = SALES_TYPES[typeResult.subType];

  const ascending = abilitiesSortedAscending(abilityScores);
  const descending = abilitiesSortedDescending(abilityScores);
  const lowestAbility = ascending[0];
  const highestAbility = descending[0];
  const top3Abilities = descending.slice(0, 3);
  const top3GrowthAbilities = ascending.slice(0, 3);

  const missedOpportunity = getMissedOpportunityComment(typeResult.mainType, lowestAbility);
  const nextActions = getNextActions(ascending);
  const comboFeedback = getAbilityComboFeedback(highestAbility, lowestAbility);
  const growthGoal = GROWTH_GOAL_PHRASE[lowestAbility];
  const affinity = CUSTOMER_TYPE_AFFINITY[typeResult.mainType];

  const firstAction = nextActions[0];
  const firstScript = firstAction.scripts[0];

  const showInsurance = profile.industry === "insurance";
  const showIndividual = profile.salesTarget === "individual" || profile.salesTarget === "both";
  const showCorporate = profile.salesTarget === "corporate" || profile.salesTarget === "both";

  return (
    <PageShell>
      <PageCard className="max-w-3xl">
        {/* ===================== ファーストビュー ===================== */}

        {/* ① あなたは何型か */}
        <section className="relative text-center">
          <p className="text-sm font-bold tracking-widest text-indigo-600">あなたの営業タイプは…</p>

          <div className="mx-auto mt-3">
            <HeroCharacter typeId={typeResult.mainType} size="md" showName={false} />
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{mainType.name}</h1>
          <p className={`mt-1.5 text-xl font-bold ${mainType.accent.text}`}>「{mainType.catch}」</p>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-800 sm:text-base">
            {mainType.description}
          </p>
        </section>

        {/* ②〜④ 強み / 改善ポイント / 次の一言 */}
        <div className="mt-8 space-y-4">
          {/* ② 何が強いか */}
          <SummaryBlock label="強み" title="あなたの営業武器 TOP3" accent="amber">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {top3Abilities.map((key, i) => (
                <div
                  key={key}
                  className="rounded-xl border-2 border-amber-300 bg-white px-2 py-3 text-center shadow-sm sm:p-4"
                >
                  <p className="text-lg sm:text-xl">{["🥇", "🥈", "🥉"][i]}</p>
                  <p className="mt-0.5 text-[0.9rem] font-bold leading-tight text-slate-900 sm:text-lg">
                    {ABILITY_LABELS[key]}
                  </p>
                  <p className="text-xl font-bold text-amber-700 sm:text-2xl">{abilityScores[key]}点</p>
                </div>
              ))}
            </div>
          </SummaryBlock>

          {/* ③ 何を改善すべきか(旧「伸ばすポイント」と「今月の育成テーマ」を統合) */}
          <SummaryBlock label="改善" title="最優先で伸ばすポイント" accent="blue">
            <div className="flex items-center gap-4">
              <CharacterAvatar typeId={typeResult.mainType} size="md" />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-bold text-blue-600">
                  <IconTarget className="h-4 w-4" /> 伸ばす力
                </p>
                <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{ABILITY_LABELS[lowestAbility]}</p>
                <p className="text-base font-semibold text-blue-700">「{growthGoal}」</p>
              </div>
            </div>
            <p className="mt-4 border-t-2 border-blue-100 pt-4 text-base leading-relaxed text-slate-800">
              {comboFeedback}
            </p>
          </SummaryBlock>

          {/* ④ 次に何をするか */}
          <SummaryBlock label="行動" title="次の商談で、まずこれだけ" accent="purple">
            <p className="text-base font-semibold leading-relaxed text-slate-900">{firstAction.action}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-bold text-purple-700">
              <IconMessage className="h-4 w-4" /> そのまま使える一言
            </p>
            <p className="mt-1.5 rounded-xl border-2 border-purple-200 bg-white px-4 py-3.5 text-lg font-bold leading-relaxed text-slate-900 shadow-sm">
              {firstScript}
            </p>
          </SummaryBlock>
        </div>

        {/* 詳細を開くボタン */}
        <div className="mt-8 text-center">
          <GradientButton onClick={() => setShowDetail((v) => !v)} className="w-full sm:w-auto">
            {showDetail ? "詳しい分析を閉じる" : "詳しい分析を見る"}
            {!showDetail && <IconArrowRight className="ml-2 inline-block h-4 w-4 align-[-2px]" />}
          </GradientButton>
          {!showDetail && (
            <p className="mt-3 text-sm font-semibold text-slate-600">
              営業力8項目・顧客タイプ相性・具体的な行動プランなどを表示します
            </p>
          )}
        </div>

        {/* ===================== 詳細分析(折りたたみ) ===================== */}
        {showDetail && (
          <div>
            {/* サブタイプとタイプの詳しい説明 */}
            <Section title="あなたのタイプをもう少し詳しく">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className={`rounded-xl border border-purple-100 ${mainType.accent.soft} p-4`}>
                  <p className="text-sm font-bold text-indigo-600">強み</p>
                  <p className="mt-1 text-base text-slate-800">{mainType.strength}</p>
                </div>
                <div className={`rounded-xl border border-purple-100 ${mainType.accent.soft} p-4`}>
                  <p className="text-sm font-bold text-indigo-600">注意点</p>
                  <p className="mt-1 text-base text-slate-800">{mainType.caution}</p>
                </div>
              </div>

              <div
                className={`mt-4 inline-flex items-center gap-3 rounded-full border border-purple-100 ${subType.accent.soft} py-2 pl-2 pr-6 shadow-sm`}
              >
                <CharacterAvatar typeId={typeResult.subType} size="sm" />
                <div className="text-left">
                  <p className="text-sm font-bold text-indigo-600">あなたのサブタイプ</p>
                  <p className={`text-lg font-bold ${subType.accent.text}`}>{subType.name}</p>
                </div>
              </div>
            </Section>

            {/* 8能力レーダーチャート */}
            <Section title="営業力8項目のバランス">
              <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
                <p className="text-center text-lg font-bold text-slate-800">
                  営業スキルバランス{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                    {overallScore}
                  </span>
                </p>
                <AbilityRadarChart scores={abilityScores} />
                <div className="mt-6">
                  <AbilityBars scores={abilityScores} />
                </div>
                <InfoBox className="mt-5">
                  自己回答をもとにした現在の営業行動傾向です。営業成績そのものを評価する点数ではありません。
                </InfoBox>
              </div>
            </Section>

            {/* 顧客との相性 TOP3 */}
            <Section title="あなたが力を発揮しやすいお客様 TOP3">
              <div className="mb-4 flex items-center gap-3">
                <CharacterAvatar typeId={typeResult.mainType} size="md" />
                <p className="text-base font-semibold text-slate-700">
                  {mainType.name}の「{mainType.catch}」が特に活きやすいお客様です
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 pt-2 sm:grid-cols-3">
                {affinity.strongTypes.map((card, i) => (
                  <CustomerCard key={card.id} card={card} rank={i as 0 | 1 | 2} />
                ))}
              </div>
              <InfoBox className="mt-4">
                自己回答をもとにした営業行動傾向です。年齢・性別などを断定するものではなく、「この顧客なら必ず売れる」ことを保証するものでもありません。
              </InfoBox>
            </Section>

            {/* 少し工夫すると、もっと成果につながるお客様 */}
            <Section
              title={
                <span className="flex items-center gap-2">
                  <IconStar className="h-6 w-6 text-blue-500" />
                  少し工夫すると、もっと成果につながるお客様
                </span>
              }
            >
              <CustomerCard card={affinity.growthType} />
            </Section>

            {showInsurance && (
              <Section title="保険営業として分析すると">
                <div className="mb-4 flex items-center gap-3">
                  <CharacterAvatar typeId={typeResult.mainType} size="md" />
                  <p className="text-base font-semibold text-slate-700">
                    {mainType.name}からのワンポイントアドバイスです
                  </p>
                </div>
                <div className="space-y-6">
                  {showIndividual && (
                    <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-6 shadow-sm">
                      {showCorporate && <p className="mb-4 text-sm font-bold text-purple-700">個人保険</p>}
                      <div className="space-y-5">
                        {ABILITY_KEYS.map((key) => (
                          <div key={key}>
                            <p className="text-lg font-bold text-slate-900">
                              {ABILITY_LABELS[key]}
                              <span className="ml-2 text-base font-semibold text-purple-600">
                                {abilityScores[key]}点
                              </span>
                            </p>
                            <p className="mt-1 text-base leading-relaxed text-slate-700">
                              {INSURANCE_INDIVIDUAL_FEEDBACK[key][levelOf(abilityScores[key])]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {showCorporate && (
                    <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-6 shadow-sm">
                      {showIndividual && <p className="mb-4 text-sm font-bold text-purple-700">法人保険</p>}
                      <div className="space-y-5">
                        {ABILITY_KEYS.map((key) => (
                          <div key={key}>
                            <p className="text-lg font-bold text-slate-900">
                              {ABILITY_LABELS[key]}
                              <span className="ml-2 text-base font-semibold text-purple-600">
                                {abilityScores[key]}点
                              </span>
                            </p>
                            <p className="mt-1 text-base leading-relaxed text-slate-700">
                              {INSURANCE_CORPORATE_FEEDBACK[key][levelOf(abilityScores[key])]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* 売上を逃しやすい瞬間 */}
            <Section title="売上を逃しやすい瞬間">
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
                <p className="text-base font-semibold leading-relaxed text-amber-900">{missedOpportunity}</p>
              </div>
            </Section>

            {/* 次の商談でやること3つ(①はファーストビューに要約済み。ここでは3ステップ全体を表示) */}
            <Section title="次の商談で、これだけやってみよう">
              <ol className="space-y-4">
                {nextActions.map((action, i) => (
                  <li
                    key={action.step}
                    className="flex gap-4 rounded-2xl border-2 border-purple-200 bg-white p-5 shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-indigo-600">{action.heading}</p>
                      <p className="mt-1 text-base text-slate-800">{action.action}</p>
                      <div className="mt-2 space-y-1.5">
                        {action.scripts.map((s) => (
                          <p
                            key={s}
                            className="rounded-lg border border-purple-100 bg-purple-50/60 px-3.5 py-2.5 text-base font-bold text-slate-900"
                          >
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            {/* 6タイプ一覧(おまけ・折りたたみ) */}
            <TypesShowcase />
          </div>
        )}

        {/* ===================== 結果の締め ===================== */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900">あなたの営業には、まだ伸びしろがある。</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-700">
            営業タイプに優劣はありません。大切なのは、自分の強みを理解し、自分に合った方法で必要な能力を伸ばすことです。
          </p>
          <SecondaryButton onClick={onRestart} className="mt-6">
            3か月後にもう一度診断する
          </SecondaryButton>
        </section>

        <InfoBox className="mx-auto mt-10 max-w-lg">
          本診断は自己回答をもとにした営業行動傾向を可視化するものです。特定の顧客への適性、営業成果、成約を保証するものではありません。
        </InfoBox>

        {/* ===================== テストアンケート(診断本文とは分離) ===================== */}
        {answers && (
          <section className="mt-10 border-t-2 border-purple-100 pt-8">
            {!showSurvey ? (
              <div className="text-center">
                <p className="text-base font-semibold text-slate-700">
                  このサービスは現在テスト中です。感想をいただけると改善に役立ちます。
                </p>
                <SecondaryButton onClick={() => setShowSurvey(true)} className="mt-4">
                  テストに協力する
                </SecondaryButton>
              </div>
            ) : (
              <SaveTestResultForm
                profile={profile}
                answers={answers}
                abilityScores={abilityScores}
                mainType={typeResult.mainType}
                subType={typeResult.subType}
                overallScore={overallScore}
                topStrengths={top3Abilities}
                topGrowth={top3GrowthAbilities}
              />
            )}
          </section>
        )}
      </PageCard>
    </PageShell>
  );
}
