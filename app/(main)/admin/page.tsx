"use client";

import { useEffect, useState } from "react";

type GodownRegistration = {
  id: string;
  ownerName: string;
  phone: string;
  city: string;
  speciality: string;
  whatsapp: string;
  createdAt: string;
};

type BuyerInquiry = {
  id: string;
  name: string;
  phone: string;
  stone: string;
  budget: string;
  city: string;
  createdAt: string;
};

type ApiResponse = {
  data: {
    godownRegistrations: GodownRegistration[];
    buyerInquiries: BuyerInquiry[];
  };
};

export default function AdminPage() {
  const [data, setData] = useState<ApiResponse["data"]>({
    godownRegistrations: [],
    buyerInquiries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/submissions");
        if (!response.ok) return;
        const json = (await response.json()) as ApiResponse;
        setData(json.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Admin Dashboard</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Leads & Registrations</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-neutral-400">Total Godown Registrations</p>
          <p className="text-3xl font-semibold text-amber-200">{data.godownRegistrations.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-neutral-400">Total Buyer Inquiries</p>
          <p className="text-3xl font-semibold text-amber-200">{data.buyerInquiries.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-neutral-400">Total Leads</p>
          <p className="text-3xl font-semibold text-amber-200">
            {data.godownRegistrations.length + data.buyerInquiries.length}
          </p>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-2xl font-semibold text-white">Godown Registrations</h2>
        {loading ? (
          <p className="mt-3 text-sm text-neutral-400">Loading...</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-neutral-400">
                <tr>
                  <th className="px-2 py-2 text-left">Owner</th>
                  <th className="px-2 py-2 text-left">City</th>
                  <th className="px-2 py-2 text-left">Speciality</th>
                  <th className="px-2 py-2 text-left">Phone</th>
                  <th className="px-2 py-2 text-left">WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {data.godownRegistrations.map((row) => (
                  <tr key={row.id} className="border-t border-white/10 text-neutral-200">
                    <td className="px-2 py-2">{row.ownerName}</td>
                    <td className="px-2 py-2">{row.city}</td>
                    <td className="px-2 py-2">{row.speciality}</td>
                    <td className="px-2 py-2">{row.phone}</td>
                    <td className="px-2 py-2">{row.whatsapp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-2xl font-semibold text-white">Buyer Inquiries</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-neutral-400">
              <tr>
                <th className="px-2 py-2 text-left">Name</th>
                <th className="px-2 py-2 text-left">Stone</th>
                <th className="px-2 py-2 text-left">Budget</th>
                <th className="px-2 py-2 text-left">City</th>
                <th className="px-2 py-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.buyerInquiries.map((row) => (
                <tr key={row.id} className="border-t border-white/10 text-neutral-200">
                  <td className="px-2 py-2">{row.name}</td>
                  <td className="px-2 py-2">{row.stone}</td>
                  <td className="px-2 py-2">{row.budget}</td>
                  <td className="px-2 py-2">{row.city}</td>
                  <td className="px-2 py-2">{row.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
