"use client";

import { useState } from "react";
import { IntroScreen } from "./IntroScreen";
import { ProfileForm } from "./ProfileForm";
import { QuestionFlow } from "./QuestionFlow";
import { DiagnosisTransition } from "./DiagnosisTransition";
import { ResultView } from "./ResultView";
import { computeDiagnosis } from "@/lib/scoring";
import { DEMO_ANSWERS, DEMO_PROFILE } from "@/lib/demoData";
import type { Answers, DiagnosisResult, Profile } from "@/lib/types";

type Step = "intro" | "profile" | "quiz" | "transition" | "result";

export function SalesCompassApp() {
  const [step, setStep] = useState<Step>("intro");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  function handleProfileSubmit(p: Profile) {
    setProfile(p);
    setStep("quiz");
  }

  function handleQuizComplete(answers: Answers) {
    if (!profile) return;
    const diagnosis = computeDiagnosis(answers);
    setResult({ profile, ...diagnosis });
    setStep("transition");
  }

  function handleDemo() {
    const diagnosis = computeDiagnosis(DEMO_ANSWERS);
    setProfile(DEMO_PROFILE);
    setResult({ profile: DEMO_PROFILE, ...diagnosis });
    setStep("result");
  }

  function handleRestart() {
    setProfile(null);
    setResult(null);
    setStep("intro");
  }

  if (step === "intro") {
    return <IntroScreen onStart={() => setStep("profile")} onDemo={handleDemo} />;
  }
  if (step === "profile") {
    return <ProfileForm onSubmit={handleProfileSubmit} />;
  }
  if (step === "quiz") {
    return <QuestionFlow onComplete={handleQuizComplete} onExit={() => setStep("profile")} />;
  }
  if (step === "transition") {
    return <DiagnosisTransition onContinue={() => setStep("result")} />;
  }
  if (step === "result" && result) {
    return <ResultView result={result} onRestart={handleRestart} />;
  }
  return null;
}
