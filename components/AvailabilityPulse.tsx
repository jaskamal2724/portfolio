"use client";
import { motion } from "framer-motion";

export default function AvailabilityPulse() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <span className="absolute w-4 h-4 rounded-full bg-green-500 opacity-30 animate-ping" />
        <span className="relative w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
      </div>
      <span className="text-sm text-green-400 font-semibold tracking-wide">
        Available for Work
      </span>
    </div>
  );
}
