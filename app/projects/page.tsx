import { Building2 } from "lucide-react";

const projects = [
  "Adani Realty",
  "Piramal Realty",
  "Runwal Group",
  "Oberoi Realty",
  "Kalpataru",
  "K Raheja Corp",
  "Ashwin Sheth",
  "Marathon Group",
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Projects</p>
      <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
        Trusted by Developers and Architects
      </h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {projects.map((name) => (
          <div key={name} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
            <Building2 className="mx-auto mb-2 h-6 w-6 text-amber-200" />
            <p className="text-sm text-neutral-200">{name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
