'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

/**
 * A "No" button that dodges the cursor so it can never be clicked.
 * It teleports to a new random offset whenever the pointer approaches.
 */
export function RunawayNoButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dodges, setDodges] = useState(0)

  const teasing = [
    'No',
    'Are you sure?',
    'Really?',
    'Think again!',
    'Nope, catch me!',
    'Pretty please?',
  ]

  const dodge = () => {
    const x = (Math.random() - 0.5) * 320
    const y = (Math.random() - 0.5) * 180
    setPos({ x, y })
    setDodges((d) => d + 1)
  }

  return (
    <motion.button
      type="button"
      aria-label="No (this button playfully avoids the cursor)"
      onMouseEnter={dodge}
      onFocus={dodge}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
      className="inline-flex h-11 select-none items-center justify-center rounded-full border border-border bg-card px-6 font-heading text-sm font-semibold text-muted-foreground shadow-sm outline-none"
    >
      {teasing[Math.min(dodges, teasing.length - 1)]}
    </motion.button>
  )
}
