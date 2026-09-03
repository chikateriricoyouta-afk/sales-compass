import Link from "next/link";
import { notFound } from "next/navigation";
import { getTestResult } from "@/lib/testResults/db";
import {
  EXPERIENCE_LABEL,
  INDUSTRY_LABEL,
  LENGTH_RATING_LABEL,
  MEETING_METHOD_LABEL,
  SALES_STYLE_LABEL,
  SALES_TARGET_LABEL,
  TRI_STATE_LABEL,
  WILLINGNESS_LABEL,
} from "@/lib/testResults/labels";
import { SALES_TYPES } from "@/lib/salesTypes";
import { QUESTIONS } from "@/lib/questions";
import { ABILITY_LABELS } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminTestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getTestResult(id);
  if (!row) notFound();

  const mainType = SALES_TYPES[row.mainType];
  const subType = SALES_TYPES[row.subType];

  return (
    <main className="mx-auto max-w-4xl p-6 sm:p-8">
      <Link href="/admin/tests" className="text-sm text-indigo-600 hover:underline">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-2 text-xl font-bold text-slate-900">
        {row.nickname} さんの診断結果 ({new Date(row.createdAt).toLocaleString("ja-JP")})
      </h1>

      <Section title="プロフィール">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
          <Row label="業種" value={INDUSTRY_LABEL[row.industry]} />
          {row.salesTarget && <Row label="営業対象" value={SALES_TARGET_LABEL[row.salesTarget]} />}
          <Row label="営業スタイル" value={SALES_STYLE_LABEL[row.salesStyle]} />
          <Row label="商談方法" value={MEETING_METHOD_LABEL[row.meetingMethod]} />
          <Row label="営業経験" value={EXPERIENCE_LABEL[row.experience]} />
        </dl>
      </Section>

      <Section title="営業タイプ">
        <p className="text-sm">
          メインタイプ: <span className="font-bold">{mainType.name}</span>({mainType.catch}) / サブタイプ:{" "}
          <span className="font-bold">{subType.name}</span> / 総合スコア: {row.overallScore}
        </p>
        <p className="mt-2 text-sm text-slate-600">
          強みTOP3: {row.topStrengths.map((k) => ABILITY_LABELS[k]).join(" / ")}
        </p>
        <p className="text-sm text-slate-600">
          成長ポイントTOP3: {row.topGrowth.map((k) => ABILITY_LABELS[k]).join(" / ")}
        </p>
      </Section>

      <Section title="8能力スコア">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
          {Object.entries(row.abilityScores).map(([key, value]) => (
            <Row key={key} label={ABILITY_LABELS[key as keyof typeof ABILITY_LABELS]} value={String(value)} />
          ))}
        </dl>
      </Section>

      <Section title="テスターの感想">
        <dl className="space-y-2 text-sm">
          <Row label="結果は当たっていると思うか" value={`${row.accuracyRating} / 5`} />
          <Row label="結果画面の長さ" value={LENGTH_RATING_LABEL[row.lengthRating]} />
          <Row label="一番役立ったところ" value={row.mostUseful || "(未回答)"} />
          <Row label="いらない・長いと思ったところ" value={row.tooMuchOrUnnecessary || "(未回答)"} />
          <Row label="自由コメント" value={row.freeComment || "(未回答)"} />
          <Row label="同僚に勧めたいか" value={TRI_STATE_LABEL[row.recommendColleague]} />
          <Row label="お金を払って使いたいか" value={WILLINGNESS_LABEL[row.willingnessToPay]} />
          <Row label="金額感" value={row.priceSentiment || "(未回答)"} />
        </dl>
      </Section>

      <Section title="48問の回答">
        <ol className="space-y-1.5 text-sm">
          {QUESTIONS.map((q) => (
            <li key={q.id} className="flex justify-between gap-4 border-b border-slate-100 py-1">
              <span className="text-slate-700">
                Q{q.id}. {q.text}
              </span>
              <span className="shrink-0 font-semibold text-slate-900">{row.answers[q.id] ?? "-"}</span>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-lg border border-slate-200 p-4">
      <h2 className="mb-3 text-sm font-bold text-slate-700">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  );
}
