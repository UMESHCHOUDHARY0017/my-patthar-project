"use client";

import Image from "next/image";
import { MapPin, IndianRupee } from "lucide-react";
import type { Marble } from "@/lib/types/marble";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  marble: Marble;
  onSelect: (marble: Marble) => void;
};

export function MarbleCard({ marble, onSelect }: Props) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden border-white/10 bg-neutral-900/80 transition hover:border-white/30"
      onClick={() => onSelect(marble)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={marble.image_url}
          alt={marble.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge variant={marble.in_stock ? "success" : "danger"}>
            {marble.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>
          <Badge>{marble.stone_type}</Badge>
        </div>
        <CardTitle>{marble.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-neutral-300">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{marble.origin}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4" />
          <span>{marble.price_sqft}/sqft</span>
        </div>
      </CardContent>
    </Card>
  );
}
