'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalendarProps {
  value: string | null
  onChange: (iso: string) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function Calendar({ value, onChange }: CalendarProps) {
  const today = startOfToday()
  const selected = value ? new Date(value + 'T00:00:00') : null
  const [view, setView] = useState(() => {
    const base = selected ?? today
    return { year: base.getFullYear(), month: base.getMonth() }
  })
  const [dir, setDir] = useState(0)

  const firstDay = new Date(view.year, view.month, 1)
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const leading = firstDay.getDay()

  const cells: (Date | null)[] = []
  for (let i = 0; i < leading; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(view.year, view.month, d))

  const canGoPrev =
    view.year > today.getFullYear() ||
    (view.year === today.getFullYear() && view.month > today.getMonth())

  const changeMonth = (delta: number) => {
    setDir(delta)
    setView((v) => {
      const m = v.month + delta
      const year = v.year + Math.floor(m / 12)
      const month = ((m % 12) + 12) % 12
      return { year, month }
    })
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-[var(--radius-lg)] border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrev && changeMonth(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${view.year}-${view.month}`}
              initial={{ opacity: 0, y: dir >= 0 ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir >= 0 ? -8 : 8 }}
              transition={{ duration: 0.2 }}
              className="block font-heading text-base font-bold text-foreground"
            >
              {MONTHS[view.month]} {view.year}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center text-xs font-semibold text-muted-foreground"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`e-${i}`} />
          const iso = toISO(cell)
          const isPast = cell < today
          const isSelected = selected && toISO(selected) === iso
          const isToday = toISO(today) === iso
          return (
            <motion.button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onChange(iso)}
              whileHover={isPast ? undefined : { scale: 1.12 }}
              whileTap={isPast ? undefined : { scale: 0.9 }}
              aria-label={cell.toDateString()}
              aria-pressed={!!isSelected}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-full text-sm font-medium transition-colors',
                isPast && 'cursor-not-allowed text-muted-foreground/40',
                !isPast && !isSelected && 'text-foreground hover:bg-accent',
                isSelected &&
                  'bg-primary text-primary-foreground shadow-md shadow-primary/30',
              )}
            >
              {cell.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
