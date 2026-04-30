import { promises as fs } from "node:fs";
import path from "node:path";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

export type GodownRegistration = {
  id: string;
  ownerName: string;
  phone: string;
  city: string;
  address: string;
  size: string;
  speciality: string;
  photos: string;
  whatsapp: string;
  createdAt: string;
};

export type BuyerInquiry = {
  id: string;
  name: string;
  phone: string;
  stone: string;
  budget: string;
  city: string;
  createdAt: string;
};

type StoreSchema = {
  godownRegistrations: GodownRegistration[];
  buyerInquiries: BuyerInquiry[];
};

const dbPath = path.join(process.cwd(), "data", "submissions.json");

async function ensureDbFile() {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    const initial: StoreSchema = { godownRegistrations: [], buyerInquiries: [] };
    await fs.writeFile(dbPath, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readStore(): Promise<StoreSchema> {
  await ensureDbFile();
  const content = await fs.readFile(dbPath, "utf8");
  return JSON.parse(content) as StoreSchema;
}

async function writeStore(data: StoreSchema) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}

export async function addGodownRegistration(input: Omit<GodownRegistration, "id" | "createdAt">) {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("godown_registrations")
      .insert({
        owner_name: input.ownerName,
        phone: input.phone,
        city: input.city,
        address: input.address,
        size: input.size,
        speciality: input.speciality,
        photos: input.photos,
        whatsapp: input.whatsapp,
      })
      .select("id, created_at")
      .single();
    if (error) throw error;
    return {
      id: data.id as string,
      createdAt: data.created_at as string,
      ...input,
    };
  }
  const store = await readStore();
  const row: GodownRegistration = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  store.godownRegistrations.unshift(row);
  await writeStore(store);
  return row;
}

export async function addBuyerInquiry(input: Omit<BuyerInquiry, "id" | "createdAt">) {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("buyer_inquiries")
      .insert({
        name: input.name,
        phone: input.phone,
        stone: input.stone,
        budget: input.budget,
        city: input.city,
      })
      .select("id, created_at")
      .single();
    if (error) throw error;
    return {
      id: data.id as string,
      createdAt: data.created_at as string,
      ...input,
    };
  }
  const store = await readStore();
  const row: BuyerInquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  store.buyerInquiries.unshift(row);
  await writeStore(store);
  return row;
}

export async function getSubmissionStats() {
  if (supabaseAdmin) {
    const [{ count: godowns }, { count: inquiries }, { data: citiesData }] = await Promise.all([
      supabaseAdmin.from("godown_registrations").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("buyer_inquiries").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("godown_registrations").select("city"),
    ]);

    const citySet = new Set(
      (citiesData ?? [])
        .map((r: { city: string | null }) => (r.city ?? "").trim().toLowerCase())
        .filter(Boolean)
    );

    return {
      godowns: godowns ?? 0,
      inquiries: inquiries ?? 0,
      cities: citySet.size,
    };
  }
  const store = await readStore();
  const citySet = new Set(
    store.godownRegistrations.map((item) => item.city.trim().toLowerCase()).filter(Boolean)
  );
  return {
    godowns: store.godownRegistrations.length,
    inquiries: store.buyerInquiries.length,
    cities: citySet.size,
  };
}

export async function listSubmissions() {
  if (supabaseAdmin) {
    const [godowns, inquiries] = await Promise.all([
      supabaseAdmin
        .from("godown_registrations")
        .select("id, created_at, owner_name, phone, city, speciality, whatsapp")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("buyer_inquiries")
        .select("id, created_at, name, phone, stone, budget, city")
        .order("created_at", { ascending: false }),
    ]);
    if (godowns.error) throw godowns.error;
    if (inquiries.error) throw inquiries.error;
    return {
      godownRegistrations: (godowns.data ?? []).map((r) => ({
        id: String(r.id),
        createdAt: String(r.created_at),
        ownerName: String(r.owner_name),
        phone: String(r.phone),
        city: String(r.city),
        address: "",
        size: "",
        speciality: String(r.speciality),
        photos: "",
        whatsapp: String(r.whatsapp),
      })),
      buyerInquiries: (inquiries.data ?? []).map((r) => ({
        id: String(r.id),
        createdAt: String(r.created_at),
        name: String(r.name),
        phone: String(r.phone),
        stone: String(r.stone),
        budget: String(r.budget),
        city: String(r.city),
      })),
    };
  }
  const store = await readStore();
  return store;
}
