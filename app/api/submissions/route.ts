import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/server/store";

export async function GET(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken) {
    // Support either header or query param token.
    // Header is preferred: x-admin-token
    // Query param: ?token=...
    // This keeps /api/submissions private in production.
    const url = new URL(request.url);
    const header = request.headers.get("x-admin-token");
    const qp = url.searchParams.get("token");
    if (header !== adminToken && qp !== adminToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  const data = await listSubmissions();
  return NextResponse.json({ data });
}
