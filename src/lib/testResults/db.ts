import "server-only";
import { getSupabaseAdmin, TEST_RESULTS_TABLE } from "./supabaseAdmin";
import type { TestResultRow, TestResultSubmission } from "./types";

/** アプリ側(camelCase)のデータをDBの列名(snake_case)に変換する */
function toDbRow(input: TestResultSubmission) {
  return {
    nickname: input.nickname,
    industry: input.industry,
    sales_target: input.salesTarget,
    sales_style: input.salesStyle,
    meeting_method: input.meetingMethod,
    experience: input.experience,
    answers: input.answers,
    ability_scores: input.abilityScores,
    main_type: input.mainType,
    sub_type: input.subType,
    overall_score: input.overallScore,
    top_strengths: input.topStrengths,
    top_growth: input.topGrowth,
    accuracy_rating: input.accuracyRating,
    length_rating: input.lengthRating,
    most_useful: input.mostUseful,
    too_much_or_unnecessary: input.tooMuchOrUnnecessary,
    free_comment: input.freeComment,
    recommend_colleague: input.recommendColleague,
    willingness_to_pay: input.willingnessToPay,
    price_sentiment: input.priceSentiment,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDbRow(row: any): TestResultRow {
  return {
    id: row.id,
    createdAt: row.created_at,
    nickname: row.nickname,
    industry: row.industry,
    salesTarget: row.sales_target,
    salesStyle: row.sales_style,
    meetingMethod: row.meeting_method,
    experience: row.experience,
    answers: row.answers,
    abilityScores: row.ability_scores,
    mainType: row.main_type,
    subType: row.sub_type,
    overallScore: row.overall_score,
    topStrengths: row.top_strengths,
    topGrowth: row.top_growth,
    accuracyRating: row.accuracy_rating,
    lengthRating: row.length_rating,
    mostUseful: row.most_useful,
    tooMuchOrUnnecessary: row.too_much_or_unnecessary,
    freeComment: row.free_comment,
    recommendColleague: row.recommend_colleague,
    willingnessToPay: row.willingness_to_pay,
    priceSentiment: row.price_sentiment,
  };
}

export async function insertTestResult(input: TestResultSubmission): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TEST_RESULTS_TABLE)
    .insert(toDbRow(input))
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function listTestResults(): Promise<TestResultRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TEST_RESULTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(fromDbRow);
}

export async function getTestResult(id: string): Promise<TestResultRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TEST_RESULTS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? fromDbRow(data) : null;
}
