import { NextResponse } from "next/server";

// 環境変数の設定状況を診断する一時的なデバッグ用エンドポイント。
// /api/admin配下なのでmiddlewareのBasic認証で保護されている。
// SUPABASE_URL は秘密情報ではない(アプリが公開通信に使うエンドポイント)ため値をそのまま返すが、
// service_role キーは秘密情報なので、値そのものは絶対に返さず形式の判定結果だけを返す。
export const dynamic = "force-dynamic";

function findBadCharIndex(s: string): number | null {
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 255) return i;
  }
  return null;
}

export async function GET() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  return NextResponse.json(
    {
      supabaseUrl: {
        value: url,
        length: url.length,
        looksCorrect: /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url),
      },
      serviceRoleKey: {
        isSet: !!key,
        length: key.length,
        startsWithEyJ: key.startsWith("eyJ"),
        startsWithSbSecret: key.startsWith("sb_secret_"),
        startsWithSbPublishable: key.startsWith("sb_publishable_"),
        badCharIndex: findBadCharIndex(key),
      },
      adminUser: { isSet: !!process.env.ADMIN_USER },
      adminPassword: { isSet: !!process.env.ADMIN_PASSWORD },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
