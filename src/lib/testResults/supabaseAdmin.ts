import "server-only";
import { createClient } from "@supabase/supabase-js";

// サーバー側(APIルート・管理画面)からのみ使うSupabaseクライアント。
// service_role キーはブラウザに一切送られないよう、"use client" のファイルからは絶対に import しないこと。
const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isTestResultsStorageConfigured(): boolean {
  return !!url && !!serviceRoleKey;
}

export function getSupabaseAdmin() {
  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が設定されていません。Vercelの環境変数を確認してください。"
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export const TEST_RESULTS_TABLE = "test_results";
