'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, ChevronDown, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TIME_OPTIONS } from '@/lib/date-options'

interface TimeSelectProps {
  value: string | null
  onChange: (value: string) => void
}

export function TimeSelect({ value, onChange }: TimeSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex h-14 w-full items-center justify-between rounded-[var(--radius-md)] border bg-card px-5 font-heading text-base outline-none transition-colors',
          open ? 'border-primary ring-4 ring-ring/20' : 'border-border',
        )}
      >
        <span className="flex items-center gap-3">
          <Clock className="size-5 text-primary" />
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value ?? 'Pick a time'}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-[var(--radius-md)] border border-border bg-popover p-2 shadow-xl shadow-primary/10"
          >
            {TIME_OPTIONS.map((opt) => {
              const isSelected = opt === value
              return (
                <li key={opt} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[var(--radius-sm)] px-4 py-2.5 text-left text-sm font-medium transition-colors',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent',
                    )}
                  >
                    {opt}
                    {isSelected && <Check className="size-4" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
