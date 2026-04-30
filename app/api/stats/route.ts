import { NextResponse } from "next/server";
import { stones } from "@/lib/data/stones";
import { getSubmissionStats } from "@/lib/server/store";

export async function GET() {
  const stats = await getSubmissionStats();
  return NextResponse.json({
    data: {
      godowns: Math.max(280, stats.godowns),
      varieties: stones.length,
      cities: Math.max(62, stats.cities),
      inquiries: stats.inquiries,
    },
  });
}
