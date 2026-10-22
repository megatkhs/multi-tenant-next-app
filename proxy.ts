    // src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)"],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // ローカル環境（localhost:3000）や本番ルートドメインを除外する設定
  const currentHost = hostname.match(/^[^:]+/)?.[0] || "";
  const rootDomain = "multi-tenant-next.megatkhs.com"; // 運用するルートドメインに変更

  // サブドメインを抽出（例: tenant1.example.com -> tenant1）
  const isSubdomain = currentHost.endsWith(`.${rootDomain}`) || (currentHost.includes(".localhost"));
  const tenant = isSubdomain
    ? currentHost.replace(`.${rootDomain}`, "").replace(".localhost", "")
    : null;

  // テナントが存在する場合は /[domain] へリライト
  if (tenant) {
    return NextResponse.rewrite(new URL(`/${tenant}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}