"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart3, Bell, Crown, Search, Settings, User } from "lucide-react";

const navItems = ["Portfolio", "Leads", "Analytics", "Markets"];

export function NavMenu() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-primary/20"
        >
          <Crown className="h-5 w-5 text-primary" />
        </motion.div>
        <div>
          <p className="text-sm font-semibold">Aethelred Nexus</p>
          <p className="text-xs text-foreground/50">Elite Estate Command</p>
        </div>
      </div>
      
      <nav className="flex flex-wrap gap-1">
        {navItems.map((item, i) => (
          <motion.button
            key={item}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition",
              i === 0
                ? "bg-primary/20 text-primary"
                : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
            )}
          >
            {item}
          </motion.button>
        ))}
      </nav>
      
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/70"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/70"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/70"
          aria-label="Analytics"
        >
          <BarChart3 className="h-4 w-4" />
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/70"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </motion.button>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
        >
          <User className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium">Director</span>
        </motion.div>
      </div>
    </motion.header>
  );
}