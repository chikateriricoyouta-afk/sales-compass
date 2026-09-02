import type { Experience, Industry, MeetingMethod, SalesStyle, SalesTarget } from "./types";

export const INDUSTRY_OPTIONS: { value: Industry; label: string }[] = [
  { value: "insurance", label: "保険" },
  { value: "other", label: "その他" },
];

export const SALES_TARGET_OPTIONS: { value: SalesTarget; label: string }[] = [
  { value: "individual", label: "個人" },
  { value: "corporate", label: "法人" },
  { value: "both", label: "両方" },
];

export const SALES_STYLE_OPTIONS: { value: SalesStyle; label: string }[] = [
  { value: "newBusiness", label: "新規営業中心" },
  { value: "existing", label: "既存顧客中心" },
  { value: "both", label: "新規・既存両方" },
];

export const MEETING_METHOD_OPTIONS: { value: MeetingMethod; label: string }[] = [
  { value: "faceToFace", label: "対面中心" },
  { value: "online", label: "オンライン中心" },
  { value: "phone", label: "電話中心" },
  { value: "mixed", label: "複合" },
];

export const EXPERIENCE_OPTIONS: { value: Experience; label: string }[] = [
  { value: "under1", label: "1年未満" },
  { value: "1to3", label: "1〜3年" },
  { value: "4to10", label: "4〜10年" },
  { value: "over11", label: "11年以上" },
];
