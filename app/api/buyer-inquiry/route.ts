import { NextResponse } from "next/server";
import { addBuyerInquiry } from "@/lib/server/store";

type Payload = {
  name?: string;
  phone?: string;
  stone?: string;
  budget?: string;
  city?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const required = ["name", "phone", "stone", "budget", "city"] as const;
  const missing = required.find((key) => !body[key]?.trim());
  if (missing) {
    return NextResponse.json({ error: `Missing ${missing}` }, { status: 400 });
  }

  const saved = await addBuyerInquiry({
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    stone: body.stone!.trim(),
    budget: body.budget!.trim(),
    city: body.city!.trim(),
  });

  return NextResponse.json({ data: saved }, { status: 201 });
}
