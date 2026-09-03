"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** 管理画面の詳細ページから、不要になったテストデータ1件を削除するボタン */
export function DeleteTestResultButton({ id, nickname }: { id: string; nickname: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!window.confirm(`「${nickname}」さんのテスト結果を削除します。よろしいですか?`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/test-results/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("削除に失敗しました");
      router.push("/admin/tests");
      router.refresh();
    } catch (e) {
      setBusy(false);
      setError(e instanceof Error ? e.message : "削除に失敗しました");
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleDelete}
        disabled={busy}
        className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
      >
        {busy ? "削除中..." : "このテスト結果を削除"}
      </button>
      {error && <p className="mt-2 text-sm text-rose-700">{error}</p>}
    </div>
  );
}
