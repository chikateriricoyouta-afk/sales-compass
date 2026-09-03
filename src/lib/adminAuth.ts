// 管理画面のログイン用トークン計算。
// middleware(Edgeランタイム)とAPIルートの両方から使うため、Node専用のAPIは使わない。

export const ADMIN_COOKIE_NAME = "sc_admin_session";

/**
 * パスワードそのものをCookieに入れないよう、ハッシュ化した値をセッショントークンとして使う。
 * 管理画面はテスト運用向けの簡易保護なので、有効期限管理などは行わずシンプルな方式にしている。
 */
export async function deriveSessionToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`sales-compass-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** タイミング差で内容を推測されにくいように、長さを揃えて全文字を比較する */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
