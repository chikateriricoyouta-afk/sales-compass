import { NextResponse } from "next/server";
import { listTestResults } from "@/lib/testResults/db";
import { QUESTIONS } from "@/lib/questions";
import { ABILITY_KEYS, ABILITY_LABELS } from "@/lib/types";
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

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const rows = await listTestResults();

  const header = [
    "日時",
    "名前",
    "業種",
    "営業対象",
    "営業スタイル",
    "商談方法",
    "営業経験",
    ...ABILITY_KEYS.map((k) => ABILITY_LABELS[k]),
    "メインタイプ",
    "サブタイプ",
    "総合スコア",
    "強みTOP3",
    "成長ポイントTOP3",
    "納得度(1-5)",
    "結果の長さ",
    "一番役立ったところ",
    "いらない・長いと思ったところ",
    "自由コメント",
    "同僚に勧めたいか",
    "支払意思",
    "金額感",
    ...QUESTIONS.map((q) => `Q${q.id}`),
  ];

  const lines = [header.map(csvEscape).join(",")];

  for (const row of rows) {
    const line = [
      new Date(row.createdAt).toLocaleString("ja-JP"),
      row.nickname,
      INDUSTRY_LABEL[row.industry],
      row.salesTarget ? SALES_TARGET_LABEL[row.salesTarget] : "",
      SALES_STYLE_LABEL[row.salesStyle],
      MEETING_METHOD_LABEL[row.meetingMethod],
      EXPERIENCE_LABEL[row.experience],
      ...ABILITY_KEYS.map((k) => row.abilityScores[k]),
      SALES_TYPES[row.mainType].name,
      SALES_TYPES[row.subType].name,
      row.overallScore,
      row.topStrengths.map((k) => ABILITY_LABELS[k]).join(" / "),
      row.topGrowth.map((k) => ABILITY_LABELS[k]).join(" / "),
      row.accuracyRating,
      LENGTH_RATING_LABEL[row.lengthRating],
      row.mostUseful,
      row.tooMuchOrUnnecessary,
      row.freeComment,
      TRI_STATE_LABEL[row.recommendColleague],
      WILLINGNESS_LABEL[row.willingnessToPay],
      row.priceSentiment,
      ...QUESTIONS.map((q) => row.answers[q.id] ?? ""),
    ];
    lines.push(line.map(csvEscape).join(","));
  }

  // Excelでの文字化けを防ぐためBOMを付与する
  const csv = "﻿" + lines.join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sales-compass-test-results.csv"`,
    },
  });
}
