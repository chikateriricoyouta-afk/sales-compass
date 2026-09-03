import Link from "next/link";
import { listTestResults } from "@/lib/testResults/db";
import { isTestResultsStorageConfigured } from "@/lib/testResults/supabaseAdmin";
import { summarizeTestResults } from "@/lib/testResults/summary";
import { LENGTH_RATING_LABEL } from "@/lib/testResults/labels";
import { SALES_TYPES, SALES_TYPE_ORDER } from "@/lib/salesTypes";
import { ABILITY_LABELS } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminTestsPage() {
  if (!isTestResultsStorageConfigured()) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="text-xl font-bold">テスト結果 管理画面</h1>
        <p className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          保存先データベースがまだ設定されていません(SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が未設定)。
        </p>
      </main>
    );
  }

  const rows = await listTestResults();
  const summary = summarizeTestResults(rows);

  return (
    <main className="mx-auto max-w-6xl p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">テスト結果 管理画面</h1>
        <a
          href="/api/admin/test-results/export"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          CSVダウンロード
        </a>
      </div>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="テスト人数" value={`${summary.count}人`} />
        <SummaryCard label="診断納得度 平均" value={`${summary.accuracyAverage} / 5`} />
        <SummaryCard label="結果が長いと回答" value={`${Math.round(summary.longRatio * 100)}%`} />
        <SummaryCard label="同僚に勧めたい(はい)" value={`${Math.round(summary.recommendYesRatio * 100)}%`} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <h2 className="text-sm font-bold text-slate-700">各営業タイプの人数</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {SALES_TYPE_ORDER.map((id) => (
              <li key={id} className="flex justify-between">
                <span>{SALES_TYPES[id].name}</span>
                <span className="font-semibold">{summary.typeCounts[id]}人</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <h2 className="text-sm font-bold text-slate-700">8能力の平均スコア</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {Object.entries(summary.abilityAverages).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{ABILITY_LABELS[key as keyof typeof ABILITY_LABELS]}</span>
                <span className="font-semibold">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 p-4 sm:col-span-2">
          <h2 className="text-sm font-bold text-slate-700">支払意思</h2>
          <p className="mt-2 text-sm text-slate-700">
            はい: {summary.willingnessCounts.yes}人 / 条件による: {summary.willingnessCounts.depends}人 / いいえ:{" "}
            {summary.willingnessCounts.no}人
          </p>
        </div>
      </section>

      <section className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-4">日時</th>
              <th className="py-2 pr-4">名前</th>
              <th className="py-2 pr-4">メインタイプ</th>
              <th className="py-2 pr-4">サブタイプ</th>
              <th className="py-2 pr-4">総合スコア</th>
              <th className="py-2 pr-4">納得度</th>
              <th className="py-2 pr-4">長さ評価</th>
              <th className="py-2 pr-4">同僚に勧めたい</th>
              <th className="py-2 pr-4">支払意思</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2 pr-4">
                  <Link href={`/admin/tests/${row.id}`} className="text-indigo-600 hover:underline">
                    {new Date(row.createdAt).toLocaleString("ja-JP")}
                  </Link>
                </td>
                <td className="py-2 pr-4">{row.nickname}</td>
                <td className="py-2 pr-4">{SALES_TYPES[row.mainType].name}</td>
                <td className="py-2 pr-4">{SALES_TYPES[row.subType].name}</td>
                <td className="py-2 pr-4">{row.overallScore}</td>
                <td className="py-2 pr-4">{row.accuracyRating} / 5</td>
                <td className="py-2 pr-4">{LENGTH_RATING_LABEL[row.lengthRating]}</td>
                <td className="py-2 pr-4">{row.recommendColleague}</td>
                <td className="py-2 pr-4">{row.willingnessToPay}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="py-6 text-center text-slate-500">まだテスト結果がありません。</p>}
      </section>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
