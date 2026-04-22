"use client";

import { motion, type Variants } from "framer-motion";
import type { Marble } from "@/lib/types/marble";
import { MarbleCard } from "@/components/inventory/marble-card";

type Props = {
  marbles: Marble[];
  onSelect: (marble: Marble) => void;
};

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
};

export function InventoryGrid({ marbles, onSelect }: Props) {
  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
    >
      {marbles.map((marble) => (
        <motion.div key={marble.id} variants={childVariants}>
          <MarbleCard marble={marble} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
}
