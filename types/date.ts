import { z } from 'zod'

export const datePlanSchema = z.object({
  date: z.string().nullable(),
  time: z.string().nullable(),
  duration: z.string().nullable(),
  transportation: z.array(z.string()),
  food: z.array(z.string()),
})

export type DatePlan = z.infer<typeof datePlanSchema>

export interface DurationOption {
  id: string
  label: string
  description: string
}

export interface TransportOption {
  id: string
  label: string
  icon: string
}

export interface FoodOption {
  id: string
  label: string
  emoji: string
}
