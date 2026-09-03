"use client";

import { useState } from "react";
import { GradientButton } from "./Button";
import { IconCheck } from "./Icons";
import type {
  AbilityKey,
  AbilityScores,
  Answers,
  Experience,
  Industry,
  MeetingMethod,
  Profile,
  SalesStyle,
  SalesTypeId,
} from "@/lib/types";
import type {
  LengthRating,
  TestResultSubmission,
  TriStateOpinion,
  WillingnessToPay,
} from "@/lib/testResults/types";

function OptionRow<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            value === opt.value
              ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
              : "border-purple-200 bg-white text-slate-700 hover:border-purple-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-bold text-indigo-700">{children}</p>;
}

const ACCURACY_OPTIONS: { value: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { value: 1, label: "1(当たっていない)" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5(当たっている)" },
];

const LENGTH_OPTIONS: { value: LengthRating; label: string }[] = [
  { value: "short", label: "短い" },
  { value: "good", label: "ちょうどいい" },
  { value: "long", label: "長い" },
];

const TRI_STATE_OPTIONS: { value: TriStateOpinion; label: string }[] = [
  { value: "yes", label: "はい" },
  { value: "neutral", label: "どちらともいえない" },
  { value: "no", label: "いいえ" },
];

const WILLINGNESS_OPTIONS: { value: WillingnessToPay; label: string }[] = [
  { value: "yes", label: "はい" },
  { value: "depends", label: "条件による" },
  { value: "no", label: "いいえ" },
];

export function SaveTestResultForm({
  profile,
  answers,
  abilityScores,
  mainType,
  subType,
  overallScore,
  topStrengths,
  topGrowth,
}: {
  profile: Profile;
  answers: Answers;
  abilityScores: AbilityScores;
  mainType: SalesTypeId;
  subType: SalesTypeId;
  overallScore: number;
  topStrengths: AbilityKey[];
  topGrowth: AbilityKey[];
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [nickname, setNickname] = useState("");
  const [accuracyRating, setAccuracyRating] = useState<1 | 2 | 3 | 4 | 5>();
  const [lengthRating, setLengthRating] = useState<LengthRating>();
  const [mostUseful, setMostUseful] = useState("");
  const [tooMuchOrUnnecessary, setTooMuchOrUnnecessary] = useState("");
  const [freeComment, setFreeComment] = useState("");
  const [recommendColleague, setRecommendColleague] = useState<TriStateOpinion>();
  const [willingnessToPay, setWillingnessToPay] = useState<WillingnessToPay>();
  const [priceSentiment, setPriceSentiment] = useState("");

  const canSubmit =
    !!nickname.trim() && !!accuracyRating && !!lengthRating && !!recommendColleague && !!willingnessToPay;

  async function handleSubmit() {
    if (!canSubmit || !accuracyRating || !lengthRating || !recommendColleague || !willingnessToPay) return;
    setStatus("submitting");
    setErrorMessage("");

    const payload: TestResultSubmission = {
      nickname: nickname.trim(),
      industry: profile.industry as Industry,
      salesTarget: profile.salesTarget ?? null,
      salesStyle: profile.salesStyle as SalesStyle,
      meetingMethod: profile.meetingMethod as MeetingMethod,
      experience: profile.experience as Experience,
      answers,
      abilityScores,
      mainType,
      subType,
      overallScore,
      topStrengths,
      topGrowth,
      accuracyRating,
      lengthRating,
      mostUseful: mostUseful.trim(),
      tooMuchOrUnnecessary: tooMuchOrUnnecessary.trim(),
      freeComment: freeComment.trim(),
      recommendColleague,
      willingnessToPay,
      priceSentiment: priceSentiment.trim(),
    };

    try {
      const res = await fetch("/api/test-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "保存に失敗しました。時間をおいて再度お試しください。");
      }
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "保存に失敗しました。");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-6">
        <IconCheck className="h-8 w-8 shrink-0 text-emerald-600" />
        <p className="text-base font-bold text-emerald-800">
          テスト結果を保存しました。ご協力ありがとうございます!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-purple-200 bg-white p-5 shadow-sm sm:p-7">
      <p className="text-lg font-bold text-slate-900">この診断結果をテストデータとして保存する</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        今後のサービス改善のため、以下にご協力いただける方はご回答のうえ保存してください。顧客名や商談内容など、あなた以外の情報は入力しないでください。
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <FieldLabel>ニックネーム(必須・本名でなくてOK)</FieldLabel>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例: えいぎょう太郎"
            className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-base text-slate-900 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <FieldLabel>今回の結果は自分に当たっていると思いますか?</FieldLabel>
          <OptionRow options={ACCURACY_OPTIONS} value={accuracyRating} onChange={setAccuracyRating} />
        </div>

        <div>
          <FieldLabel>結果画面の長さはどうでしたか?</FieldLabel>
          <OptionRow options={LENGTH_OPTIONS} value={lengthRating} onChange={setLengthRating} />
        </div>

        <div>
          <FieldLabel>一番役立ったところ(任意)</FieldLabel>
          <textarea
            value={mostUseful}
            onChange={(e) => setMostUseful(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-base text-slate-900 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <FieldLabel>いらない、または長いと思ったところ(任意)</FieldLabel>
          <textarea
            value={tooMuchOrUnnecessary}
            onChange={(e) => setTooMuchOrUnnecessary(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-base text-slate-900 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <FieldLabel>自由コメント(任意)</FieldLabel>
          <textarea
            value={freeComment}
            onChange={(e) => setFreeComment(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-base text-slate-900 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <FieldLabel>このサービスを同僚にも使わせたいと思いますか?</FieldLabel>
          <OptionRow options={TRI_STATE_OPTIONS} value={recommendColleague} onChange={setRecommendColleague} />
        </div>

        <div>
          <FieldLabel>もし知らないサービスだった場合、お金を払って使いたいと思いますか?</FieldLabel>
          <OptionRow options={WILLINGNESS_OPTIONS} value={willingnessToPay} onChange={setWillingnessToPay} />
        </div>

        <div>
          <FieldLabel>払う場合、金額感はどれくらいですか?(任意)</FieldLabel>
          <input
            value={priceSentiment}
            onChange={(e) => setPriceSentiment(e.target.value)}
            placeholder="例: 月500円くらいなら"
            className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-base text-slate-900 focus:border-purple-400 focus:outline-none"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {errorMessage}
        </p>
      )}

      <GradientButton
        onClick={handleSubmit}
        disabled={!canSubmit || status === "submitting"}
        className="mt-6 w-full"
      >
        {status === "submitting" ? "保存中..." : "テスト結果を保存"}
      </GradientButton>
    </div>
  );
}
