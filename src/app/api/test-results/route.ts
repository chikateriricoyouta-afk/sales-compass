import { NextRequest, NextResponse } from "next/server";
import { insertTestResult } from "@/lib/testResults/db";
import { isTestResultsStorageConfigured } from "@/lib/testResults/supabaseAdmin";
import type { TestResultSubmission } from "@/lib/testResults/types";
import { ABILITY_KEYS } from "@/lib/types";
import { SALES_TYPE_IDS } from "@/lib/types";

const INDUSTRY = ["insurance", "other"];
const SALES_TARGET = ["individual", "corporate", "both"];
const SALES_STYLE = ["newBusiness", "existing", "both"];
const MEETING_METHOD = ["faceToFace", "online", "phone", "mixed"];
const EXPERIENCE = ["under1", "1to3", "4to10", "over11"];
const LENGTH_RATING = ["short", "good", "long"];
const TRI_STATE = ["yes", "neutral", "no"];
const WILLINGNESS = ["yes", "depends", "no"];

const MAX_TEXT = 2000;

function isShortText(v: unknown): v is string {
  return typeof v === "string" && v.length <= MAX_TEXT;
}

/** 送信されたJSONが期待する形になっているか最低限の検証を行う(不正なリクエストからDBを守るため) */
function validate(body: unknown): { ok: true; data: TestResultSubmission } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "invalid body" };
  const b = body as Record<string, unknown>;

  if (!isShortText(b.nickname) || !b.nickname.trim()) return { ok: false, error: "nickname required" };
  if (!INDUSTRY.includes(b.industry as string)) return { ok: false, error: "invalid industry" };
  if (b.salesTarget !== null && !SALES_TARGET.includes(b.salesTarget as string))
    return { ok: false, error: "invalid salesTarget" };
  if (!SALES_STYLE.includes(b.salesStyle as string)) return { ok: false, error: "invalid salesStyle" };
  if (!MEETING_METHOD.includes(b.meetingMethod as string)) return { ok: false, error: "invalid meetingMethod" };
  if (!EXPERIENCE.includes(b.experience as string)) return { ok: false, error: "invalid experience" };
  if (typeof b.answers !== "object" || b.answers === null) return { ok: false, error: "invalid answers" };
  if (typeof b.abilityScores !== "object" || b.abilityScores === null)
    return { ok: false, error: "invalid abilityScores" };
  if (!SALES_TYPE_IDS.includes(b.mainType as never)) return { ok: false, error: "invalid mainType" };
  if (!SALES_TYPE_IDS.includes(b.subType as never)) return { ok: false, error: "invalid subType" };
  if (typeof b.overallScore !== "number") return { ok: false, error: "invalid overallScore" };
  if (
    !Array.isArray(b.topStrengths) ||
    !b.topStrengths.every((k) => ABILITY_KEYS.includes(k as never))
  )
    return { ok: false, error: "invalid topStrengths" };
  if (!Array.isArray(b.topGrowth) || !b.topGrowth.every((k) => ABILITY_KEYS.includes(k as never)))
    return { ok: false, error: "invalid topGrowth" };
  if (![1, 2, 3, 4, 5].includes(b.accuracyRating as number)) return { ok: false, error: "invalid accuracyRating" };
  if (!LENGTH_RATING.includes(b.lengthRating as string)) return { ok: false, error: "invalid lengthRating" };
  if (!isShortText(b.mostUseful)) return { ok: false, error: "invalid mostUseful" };
  if (!isShortText(b.tooMuchOrUnnecessary)) return { ok: false, error: "invalid tooMuchOrUnnecessary" };
  if (!isShortText(b.freeComment)) return { ok: false, error: "invalid freeComment" };
  if (!TRI_STATE.includes(b.recommendColleague as string)) return { ok: false, error: "invalid recommendColleague" };
  if (!WILLINGNESS.includes(b.willingnessToPay as string)) return { ok: false, error: "invalid willingnessToPay" };
  if (!isShortText(b.priceSentiment)) return { ok: false, error: "invalid priceSentiment" };

  return { ok: true, data: b as unknown as TestResultSubmission };
}

export async function POST(req: NextRequest) {
  if (!isTestResultsStorageConfigured()) {
    return NextResponse.json(
      { error: "not_configured", message: "保存機能はまだ準備中です。しばらくしてから再度お試しください。" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    const id = await insertTestResult(result.data);
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json(
      { error: "insert_failed", message: e instanceof Error ? e.message : "unknown error" },
      { status: 500 }
    );
  }
}
