import { NextResponse } from "next/server";
import { stones } from "@/lib/data/stones";

export async function GET() {
  return NextResponse.json({ data: stones });
}
