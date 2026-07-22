'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STEP_LABELS } from '@/lib/date-options'

interface ProgressBarProps {
  current: number // 1-based
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current - 1) / (total - 1)) * 100

  return (
    <div className="mx-auto w-full max-w-2xl px-2">
      <div className="relative">
        {/* track */}
        <div className="absolute left-0 right-0 top-4 h-1 rounded-full bg-border" />
        {/* fill */}
        <motion.div
          className="absolute left-0 top-4 h-1 rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />

        <ol className="relative flex items-start justify-between">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1
            const isDone = stepNum < current
            const isActive = stepNum === current
            return (
              <li
                key={label}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isDone || isActive ? '#ff4d8d' : '#ffffff',
                    borderColor: isDone || isActive ? '#ff4d8d' : '#f4d9e2',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold',
                    isDone || isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {isDone ? (
                    <Check className="size-4" />
                  ) : (
                    <span>{stepNum}</span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    'font-heading text-xs font-medium transition-colors',
                    isActive
                      ? 'text-primary'
                      : isDone
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
