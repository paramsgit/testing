'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { AnimatedCard } from '@/components/ui/animated-card'
import { FOOD_OPTIONS } from '@/lib/date-options'
import { staggerContainer, popItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface FoodGridProps {
  value: string[]
  onToggle: (id: string) => void
}

export function FoodGrid({ value, onToggle }: FoodGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-4 md:grid-cols-4"
    >
      {FOOD_OPTIONS.map((opt) => {
        const selected = value.includes(opt.id)
        return (
          <motion.div key={opt.id} variants={popItem}>
            <AnimatedCard
              selected={selected}
              onClick={() => onToggle(opt.id)}
              role="checkbox"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onToggle(opt.id)
                }
              }}
              className="relative flex h-full flex-col items-center gap-2 py-5"
            >
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-3" />
                </motion.span>
              )}
              <motion.span
                animate={selected ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
                className="text-4xl leading-none"
                aria-hidden="true"
              >
                {opt.emoji}
              </motion.span>
              <span
                className={cn(
                  'text-center font-heading text-sm font-semibold',
                  selected ? 'text-primary' : 'text-foreground',
                )}
              >
                {opt.label}
              </span>
            </AnimatedCard>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
