import { NextRequest, NextResponse } from "next/server";

// 管理画面(/admin)とその裏側のAPI(/api/admin)を、簡易パスワード(Basic認証)で保護する。
// テスターの感想などが誰でも見られる状態にならないための最低限のガード。
// ADMIN_USER / ADMIN_PASSWORD が未設定の間は、管理画面自体が使えないよう安全側に倒す。

function unauthorized() {
  return new NextResponse("認証が必要です", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Sales Compass Admin"' },
  });
}

export function middleware(req: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return new NextResponse("管理画面はまだ準備中です(ADMIN_USER / ADMIN_PASSWORD 未設定)。", {
      status: 503,
    });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const decoded = Buffer.from(authHeader.slice("Basic ".length), "base64").toString("utf-8");
  const separatorIndex = decoded.indexOf(":");
  const user = separatorIndex === -1 ? decoded : decoded.slice(0, separatorIndex);
  const password = separatorIndex === -1 ? "" : decoded.slice(separatorIndex + 1);

  if (user !== adminUser || password !== adminPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
