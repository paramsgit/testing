'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  selected?: boolean
  interactive?: boolean
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  function AnimatedCard(
    { className, selected = false, interactive = true, children, ...props },
    ref,
  ) {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -6, scale: 1.02 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'rounded-[var(--radius-lg)] border bg-card p-5 text-card-foreground transition-colors',
          interactive && 'cursor-pointer',
          selected
            ? 'border-primary bg-accent shadow-lg shadow-primary/20 ring-2 ring-primary/40'
            : 'border-border shadow-sm hover:border-secondary hover:shadow-md',
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)
