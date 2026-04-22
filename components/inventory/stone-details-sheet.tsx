"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, IndianRupee, MessageCircle } from "lucide-react";
import type { Marble } from "@/lib/types/marble";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  marble: Marble | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function StoneDetailsSheet({ marble, open, onOpenChange }: Props) {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const whatsappHref = useMemo(() => {
    const message = `Hi, I am interested in ${marble?.name ?? "this stone"} seen on PattharHub.`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [marble?.name]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        {!marble ? null : (
          <div className="space-y-5">
            <SheetHeader>
              <div className="flex items-center gap-2">
                <Badge variant={marble.in_stock ? "success" : "danger"}>
                  {marble.in_stock ? "In Stock" : "Out of Stock"}
                </Badge>
                <Badge>{marble.stone_type}</Badge>
              </div>
              <SheetTitle>{marble.name}</SheetTitle>
              <SheetDescription>
                High-fidelity finish, ideal for premium interiors and statement surfaces.
              </SheetDescription>
            </SheetHeader>

            <div
              className="relative h-72 overflow-hidden rounded-2xl border border-white/10"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                setZoomPos({ x, y });
              }}
            >
              <Image
                src={marble.image_url}
                alt={marble.name}
                fill
                className="object-cover transition-transform duration-200"
                style={{
                  transform: "scale(1.8)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
                sizes="(max-width: 768px) 100vw, 480px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white/75">
                Hover to inspect fine veins and texture
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="h-4 w-4" />
                Origin: {marble.origin}
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <IndianRupee className="h-4 w-4" />
                Price: {marble.price_sqft} / sqft
              </div>
              <div className="text-neutral-300">Color: {marble.color}</div>
            </div>

            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <Button className="w-full gap-2 bg-emerald-400 text-neutral-900 hover:bg-emerald-300">
                <MessageCircle className="h-4 w-4" />
                Confirm Availability
              </Button>
            </a>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
