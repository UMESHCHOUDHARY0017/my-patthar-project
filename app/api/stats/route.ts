import { NextResponse } from "next/server";
import { stones } from "@/lib/data/stones";
import { getSubmissionStats } from "@/lib/server/store";

export async function GET() {
  const stats = await getSubmissionStats();
  return NextResponse.json({
    data: {
      godowns: stats.godowns,
      varieties: stones.length,
      cities: stats.cities,
      inquiries: stats.inquiries,
    },
  });
}