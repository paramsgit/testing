'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DatePlan } from '@/types/date'

export type Stage = 'landing' | 'wizard' | 'success'

interface DateState extends DatePlan {
  stage: Stage
  step: number
  setStage: (stage: Stage) => void
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setDate: (date: string | null) => void
  setTime: (time: string | null) => void
  setDuration: (duration: string | null) => void
  toggleTransport: (id: string) => void
  toggleFood: (id: string) => void
  reset: () => void
}

const initialPlan: DatePlan = {
  date: null,
  time: null,
  duration: null,
  transportation: [],
  food: [],
}

export const TOTAL_STEPS = 6

export const useDateStore = create<DateState>()(
  persist(
    (set) => ({
      ...initialPlan,
      stage: 'landing',
      step: 1,
      setStage: (stage) => set({ stage }),
      setStep: (step) => set({ step }),
      nextStep: () =>
        set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS) })),
      prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      setDuration: (duration) => set({ duration }),
      toggleTransport: (id) =>
        set((s) => ({
          transportation: s.transportation.includes(id)
            ? s.transportation.filter((t) => t !== id)
            : [...s.transportation, id],
        })),
      toggleFood: (id) =>
        set((s) => ({
          food: s.food.includes(id)
            ? s.food.filter((f) => f !== id)
            : [...s.food, id],
        })),
      reset: () =>
        set({ ...initialPlan, stage: 'landing', step: 1 }),
    }),
    {
      name: 'date-plan-storage',
    },
  ),
)
