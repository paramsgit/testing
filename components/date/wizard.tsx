"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { toast } from "sonner";
import { useDateStore, TOTAL_STEPS } from "@/store/use-date-store";
import { ProgressBar } from "./progress-bar";
import { Calendar } from "./calendar";
import { TimeSelect } from "./time-select";
import { DurationCards } from "./duration-cards";
import { TransportSelector } from "./transport-selector";
import { FoodGrid } from "@/components/food/food-grid";
import { SummaryCard } from "./summary-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { HeartSpinner } from "@/components/ui/heart-spinner";
import { stepSlide } from "@/animations/variants";
import {
  DURATION_OPTIONS,
  FOOD_OPTIONS,
  labelFor,
  TRANSPORT_OPTIONS,
} from "@/lib/date-options";

const STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
  1: { title: "When works for you?", subtitle: "Pick a day for our date." },
  2: { title: "What time?", subtitle: "Choose a time that suits you." },
  3: {
    title: "How long shall we hang out?",
    subtitle: "No pressure, pick what feels right.",
  },
  4: {
    title: "How should we get around?",
    subtitle: "Select all that sound fun.",
  },
  5: { title: "What are we craving?", subtitle: "Pick everything you love." },
  6: { title: "Here's our plan", subtitle: "Double-check the details below." },
};

export function Wizard() {
  const store = useDateStore();
  const {
    step,
    date,
    time,
    duration,
    transportation,
    food,
    nextStep,
    prevStep,
    setStage,
  } = store;

  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    switch (step) {
      case 1:
        if (!date) return (toast.error("Please pick a date first 💕"), false);
        return true;
      case 2:
        if (!time) return (toast.error("Please choose a time 🕒"), false);
        return true;
      case 3:
        if (!duration) return (toast.error("Please pick how long 💫"), false);
        return true;
      case 4:
        if (transportation.length === 0)
          return (toast.error("Pick at least one way to travel 🚗"), false);
        return true;
      case 5:
        if (food.length === 0)
          return (toast.error("Pick at least one thing to eat 🍕"), false);
        return true;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!validate()) return;
    setDir(1);
    setLoading(true);
    window.setTimeout(() => {
      nextStep();
      setLoading(false);
    }, 550);
  };

  const goPrev = () => {
    setDir(-1);
    prevStep();
  };
  function formatDate(iso: string | null) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const handleYesClick = async () => {
    try {
      const durationLabel =
        DURATION_OPTIONS.find((d) => d.id === duration)?.label ?? "—";
      const transportLabels = labelFor(TRANSPORT_OPTIONS, transportation);
      const foodLabels = labelFor(FOOD_OPTIONS, food);

      const values = {
        date: formatDate(date),
        time: time ?? "—",
        duration: durationLabel,
        transport: transportLabels.length ? transportLabels.join(", ") : "—",
        food: foodLabels.length ? foodLabels.join(", ") : "—",
      };
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values, name: "Kuchu" }),
      });

      if (response.ok) {
        // Store submission in localStorage to prevent duplicates
        localStorage.setItem("partyRsvpSubmitted", "true");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Failed to submit. Please try again.");
    } finally {
    }
  };

  const confirm = async () => {
    setLoading(true);
    await handleYesClick();
    window.setTimeout(() => {
      setLoading(false);
      setStage("success");
    }, 700);
  };

  const meta = STEP_TITLES[step];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="flex min-h-screen items-center justify-center px-6 py-14"
    >
      <div className="glass w-full max-w-3xl rounded-[var(--radius-2xl)] border border-border p-8 shadow-2xl shadow-primary/10">
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className="mt-8 min-h-[26rem]">
          <AnimatePresence mode="wait" custom={dir}>
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[26rem] flex-col items-center justify-center gap-4"
              >
                <HeartSpinner />
                <p className="font-heading text-sm text-muted-foreground">
                  One moment…
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={dir}
                variants={stepSlide}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <header className="mb-6 text-center">
                  <h2 className="font-heading text-2xl font-extrabold text-balance text-foreground">
                    {meta.title}
                  </h2>
                  <p className="mt-1 text-pretty text-muted-foreground">
                    {meta.subtitle}
                  </p>
                </header>

                {step === 1 && (
                  <Calendar value={date} onChange={store.setDate} />
                )}
                {step === 2 && (
                  <TimeSelect value={time} onChange={store.setTime} />
                )}
                {step === 3 && (
                  <DurationCards
                    value={duration}
                    onChange={store.setDuration}
                  />
                )}
                {step === 4 && (
                  <TransportSelector
                    value={transportation}
                    onToggle={store.toggleTransport}
                  />
                )}
                {step === 5 && (
                  <FoodGrid value={food} onToggle={store.toggleFood} />
                )}
                {step === 6 && (
                  <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center">
                    <div className="animate-soft-float order-last flex justify-center md:order-first">
                      <Image
                        src="/images/date-invite.png"
                        alt="Illustration of a couple on a date"
                        width={280}
                        height={280}
                        className="h-auto w-56 select-none"
                      />
                    </div>
                    <SummaryCard />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!loading && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <AnimatedButton
              variant="outline"
              onClick={step === 1 ? () => setStage("landing") : goPrev}
            >
              <ArrowLeft className="size-4" />
              {step === 1 ? "Back" : "Previous"}
            </AnimatedButton>

            {step < TOTAL_STEPS ? (
              <AnimatedButton onClick={goNext}>
                Next
                <ArrowRight className="size-4" />
              </AnimatedButton>
            ) : (
              <AnimatedButton onClick={confirm} sparkle>
                <Heart className="size-4 fill-current" />
                Confirm Our Date ❤️
              </AnimatedButton>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
