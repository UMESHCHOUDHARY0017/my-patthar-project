"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoneType } from "@/lib/types/marble";

type Props = {
  selectedType: StoneType | "All";
  selectedOrigin: "All" | "Rajasthan" | "Italy";
  selectedColor: string;
  onTypeChange: (value: StoneType | "All") => void;
  onOriginChange: (value: "All" | "Rajasthan" | "Italy") => void;
  onColorChange: (value: string) => void;
};

const chipClass =
  "rounded-xl border border-white/15 px-3 py-2 text-sm transition hover:bg-white/10";

export function FiltersSidebar({
  selectedType,
  selectedOrigin,
  selectedColor,
  onTypeChange,
  onOriginChange,
  onColorChange,
}: Props) {
  const colors = ["All", "White", "Black", "Green", "Brown", "Beige"];

  return (
    <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-2 text-neutral-200">
        <Sparkles className="h-4 w-4" />
        <h2 className="text-sm font-medium tracking-wide">Smart Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
            Stone Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {(["All", "Marble", "Granite"] as const).map((type) => (
              <button
                key={type}
                className={cn(
                  chipClass,
                  selectedType === type && "border-white/30 bg-white/15 text-white"
                )}
                onClick={() => onTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
            Origin
          </h3>
          <div className="flex flex-wrap gap-2">
            {(["All", "Rajasthan", "Italy"] as const).map((origin) => (
              <button
                key={origin}
                className={cn(
                  chipClass,
                  selectedOrigin === origin && "border-white/30 bg-white/15 text-white"
                )}
                onClick={() => onOriginChange(origin)}
              >
                {origin}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={cn(
                  chipClass,
                  selectedColor === color && "border-white/30 bg-white/15 text-white"
                )}
                onClick={() => onColorChange(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
