"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/tests";

  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("パスワードが違います");
      router.push(next);
      router.refresh();
    } catch (err) {
      setBusy(false);
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center p-6">
      <h1 className="text-xl font-bold text-slate-900">管理画面ログイン</h1>
      <p className="mt-2 text-sm text-slate-600">テスト結果を確認するには、パスワードを入力してください。</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-sm font-semibold text-slate-700" htmlFor="admin-password">
          パスワード
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-base text-slate-900 focus:border-indigo-500 focus:outline-none"
        />

        {error && <p className="mt-3 text-sm font-semibold text-rose-700">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {busy ? "確認中..." : "ログイン"}
        </button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
