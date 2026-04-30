import { NextResponse } from "next/server";
import { addGodownRegistration } from "@/lib/server/store";

type Payload = {
  ownerName?: string;
  phone?: string;
  city?: string;
  address?: string;
  size?: string;
  speciality?: string;
  photos?: string;
  whatsapp?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const required = ["ownerName", "phone", "city", "address", "size", "speciality", "whatsapp"] as const;
  const missing = required.find((key) => !body[key]?.trim());
  if (missing) {
    return NextResponse.json({ error: `Missing ${missing}` }, { status: 400 });
  }

  const saved = await addGodownRegistration({
    ownerName: body.ownerName!.trim(),
    phone: body.phone!.trim(),
    city: body.city!.trim(),
    address: body.address!.trim(),
    size: body.size!.trim(),
    speciality: body.speciality!.trim(),
    photos: body.photos?.trim() ?? "",
    whatsapp: body.whatsapp!.trim(),
  });

  return NextResponse.json({ data: saved }, { status: 201 });
}
