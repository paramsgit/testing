'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { AnimatedCard } from '@/components/ui/animated-card'
import { DURATION_OPTIONS } from '@/lib/date-options'
import { staggerContainer, popItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface DurationCardsProps {
  value: string | null
  onChange: (id: string) => void
}

export function DurationCards({ value, onChange }: DurationCardsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-3"
    >
      {DURATION_OPTIONS.map((opt) => {
        const selected = value === opt.id
        return (
          <motion.div key={opt.id} variants={popItem}>
            <AnimatedCard
              selected={selected}
              onClick={() => onChange(opt.id)}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChange(opt.id)
                }
              }}
              className="relative flex h-full flex-col items-start gap-1"
            >
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-3.5" />
                </motion.span>
              )}
              <span
                className={cn(
                  'font-heading text-lg font-bold',
                  selected ? 'text-primary' : 'text-foreground',
                )}
              >
                {opt.label}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {opt.description}
              </span>
            </AnimatedCard>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
