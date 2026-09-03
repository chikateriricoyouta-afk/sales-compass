import {
  EXPERIENCE_OPTIONS,
  INDUSTRY_OPTIONS,
  MEETING_METHOD_OPTIONS,
  SALES_STYLE_OPTIONS,
  SALES_TARGET_OPTIONS,
} from "@/lib/profileOptions";
import type { Experience, Industry, MeetingMethod, SalesStyle, SalesTarget } from "@/lib/types";
import type { LengthRating, TriStateOpinion, WillingnessToPay } from "./types";

function toLabelMap<T extends string>(options: { value: T; label: string }[]): Record<T, string> {
  return Object.fromEntries(options.map((o) => [o.value, o.label])) as Record<T, string>;
}

export const INDUSTRY_LABEL = toLabelMap<Industry>(INDUSTRY_OPTIONS);
export const SALES_TARGET_LABEL = toLabelMap<SalesTarget>(SALES_TARGET_OPTIONS);
export const SALES_STYLE_LABEL = toLabelMap<SalesStyle>(SALES_STYLE_OPTIONS);
export const MEETING_METHOD_LABEL = toLabelMap<MeetingMethod>(MEETING_METHOD_OPTIONS);
export const EXPERIENCE_LABEL = toLabelMap<Experience>(EXPERIENCE_OPTIONS);

export const LENGTH_RATING_LABEL: Record<LengthRating, string> = {
  short: "短い",
  good: "ちょうどいい",
  long: "長い",
};

export const TRI_STATE_LABEL: Record<TriStateOpinion, string> = {
  yes: "はい",
  neutral: "どちらともいえない",
  no: "いいえ",
};

export const WILLINGNESS_LABEL: Record<WillingnessToPay, string> = {
  yes: "はい",
  depends: "条件による",
  no: "いいえ",
};
