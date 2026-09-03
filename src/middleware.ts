import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, deriveSessionToken, safeEqual } from "@/lib/adminAuth";

// 管理画面(/admin)とその裏側のAPI(/api/admin)を、ログイン画面+Cookieで保護する。
// ブラウザ標準のBasic認証ポップアップはスマホやアプリ内ブラウザで表示されないことがあるため、
// どの端末でも確実に開ける通常のログインフォーム方式にしている。

/** ログイン画面とログインAPIは、認証チェックの対象外にする(そうしないとログインできなくなる) */
function isPublicAdminPath(pathname: string): boolean {
  return pathname === "/admin/login" || pathname === "/api/admin/login";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isPublicAdminPath(pathname)) return NextResponse.next();

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new NextResponse("管理画面はまだ準備中です(ADMIN_PASSWORD 未設定)。", { status: 503 });
  }

  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value ?? "";
  const expected = await deriveSessionToken(adminPassword);

  if (safeEqual(cookie, expected)) return NextResponse.next();

  // APIへの未認証アクセスは、リダイレクトではなく401で返す
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
