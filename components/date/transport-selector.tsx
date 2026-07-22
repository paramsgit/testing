'use client'

import { motion } from 'motion/react'
import {
  Footprints,
  Car,
  CarTaxiFront,
  TrainFront,
  Bike,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedCard } from '@/components/ui/animated-card'
import { TRANSPORT_OPTIONS } from '@/lib/date-options'
import { staggerContainer, popItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

const ICONS: Record<string, LucideIcon> = {
  walk: Footprints,
  drive: Car,
  cab: CarTaxiFront,
  metro: TrainFront,
  bike: Bike,
}

interface TransportSelectorProps {
  value: string[]
  onToggle: (id: string) => void
}

export function TransportSelector({ value, onToggle }: TransportSelectorProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-3"
    >
      {TRANSPORT_OPTIONS.map((opt) => {
        const selected = value.includes(opt.id)
        const Icon = ICONS[opt.icon]
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
              className="relative flex h-full flex-col items-center gap-3 py-6"
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
              <motion.span
                animate={selected ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 0.5 }}
                className={cn(
                  'flex size-14 items-center justify-center rounded-full transition-colors',
                  selected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-primary',
                )}
              >
                <Icon className="size-7" />
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
