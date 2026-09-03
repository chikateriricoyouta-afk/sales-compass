import { NextResponse } from "next/server";

// 環境変数の「値そのもの」は絶対に返さず、設定状況の診断だけを行う一時的なデバッグ用エンドポイント。
// /api/admin配下なのでmiddlewareのBasic認証で保護されている。
function findBadCharIndex(s: string): number | null {
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 255) return i;
  }
  return null;
}

export async function GET() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  return NextResponse.json({
    supabaseUrl: {
      isSet: !!url,
      length: url.length,
      startsWithHttps: url.startsWith("https://"),
      looksLikeSupabaseDomain: /\.supabase\.co\/?$/.test(url),
      hasTrailingSlash: url.endsWith("/"),
      badCharIndex: findBadCharIndex(url),
    },
    serviceRoleKey: {
      isSet: !!key,
      length: key.length,
      looksLikeJwt: key.startsWith("eyJ"),
      badCharIndex: findBadCharIndex(key),
    },
    adminUser: {
      isSet: !!process.env.ADMIN_USER,
    },
    adminPassword: {
      isSet: !!process.env.ADMIN_PASSWORD,
    },
  });
}
