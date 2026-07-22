'use client'

import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeartSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        animate={{ scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="size-10 fill-primary text-primary" />
      </motion.div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
