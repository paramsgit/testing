'use client'

import {
  CalendarDays,
  Clock,
  Hourglass,
  Route,
  UtensilsCrossed,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useDateStore } from '@/store/use-date-store'
import {
  DURATION_OPTIONS,
  TRANSPORT_OPTIONS,
  FOOD_OPTIONS,
  labelFor,
} from '@/lib/date-options'
import { staggerContainer, popItem } from '@/animations/variants'

function formatDate(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function SummaryCard() {
  const { date, time, duration, transportation, food } = useDateStore()

  const durationLabel =
    DURATION_OPTIONS.find((d) => d.id === duration)?.label ?? '—'
  const transportLabels = labelFor(TRANSPORT_OPTIONS, transportation)
  const foodLabels = labelFor(FOOD_OPTIONS, food)

  const rows = [
    { icon: CalendarDays, label: 'Date', value: formatDate(date) },
    { icon: Clock, label: 'Time', value: time ?? '—' },
    { icon: Hourglass, label: 'Duration', value: durationLabel },
    {
      icon: Route,
      label: 'Transport',
      value: transportLabels.length ? transportLabels.join(', ') : '—',
    },
    {
      icon: UtensilsCrossed,
      label: 'Food',
      value: foodLabels.length ? foodLabels.join(', ') : '—',
    },
  ]

  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3"
    >
      {rows.map((row) => (
        <motion.li
          key={row.label}
          variants={popItem}
          className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border bg-card p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <row.icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {row.label}
            </p>
            <p className="font-heading text-base font-semibold text-pretty text-foreground">
              {row.value}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  )
}
