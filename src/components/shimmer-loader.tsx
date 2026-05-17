"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShimmerLoaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerLoader({ className, children }: ShimmerLoaderProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-white/5",
        className
      )}
    >
      <div className="absolute inset-0 shimmer-skeleton" aria-hidden />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}