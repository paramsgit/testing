"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  value: string | null;
  onChange: (iso: string) => void;
}

const DATES = [
  {
    iso: "2026-07-31",
    day: "Friday",
    date: "31",
    month: "Jul",
    emoji: "🌸",
  },
  {
    iso: "2026-08-01",
    day: "Saturday",
    date: "1",
    month: "Aug",
    emoji: "✨",
  },
  {
    iso: "2026-08-02",
    day: "Sunday",
    date: "2",
    month: "Aug",
    emoji: "🌹",
  },
];

export function Calendar({ value, onChange }: CalendarProps) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      {DATES.map((option) => {
        const selected = value === option.iso;

        return (
          <motion.button
            key={option.iso}
            type="button"
            onClick={() => onChange(option.iso)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-300",
              selected
                ? "border-rose-300 bg-rose-50/70 shadow-md shadow-rose-200/20"
                : "border-border bg-card hover:border-rose-200 hover:bg-rose-50/30 hover:shadow-sm",
            )}
          >
            {/* Soft decorative glow */}
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-rose-100/30 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Date */}
                <div
                  className={cn(
                    "flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl transition-colors",
                    selected ? "bg-rose-100" : "bg-rose-50",
                  )}
                >
                  <span className="text-2xl font-bold leading-none text-rose-600">
                    {option.date}
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-rose-500">
                    {option.month}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{option.emoji}</span>
                    <h3 className="text-base font-semibold text-foreground">
                      {option.day}
                    </h3>
                  </div>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Let's make this day unforgettable.
                  </p>
                </div>
              </div>

              {/* Heart */}
              <motion.div
                animate={{ scale: selected ? 1 : 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  selected ? "bg-rose-100 text-rose-500" : "text-rose-300",
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all",
                    selected && "fill-current",
                  )}
                />
              </motion.div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
