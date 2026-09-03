import { NextResponse } from "next/server";
import { deleteTestResult } from "@/lib/testResults/db";

// テスト段階の不要データ(動作確認用の行など)を管理画面から削除するためのAPI。
// /api/admin配下なのでmiddlewareのBasic認証で保護されている。
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await deleteTestResult(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "delete_failed", message: e instanceof Error ? e.message : "unknown error" },
      { status: 500 }
    );
  }
}
