'use client'

import { useMemo } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingHeartsProps {
  count?: number
  className?: string
}

interface HeartSeed {
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export function FloatingHearts({ count = 14, className }: FloatingHeartsProps) {
  const hearts = useMemo<HeartSeed[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      left: (i * 97) % 100,
      size: 16 + ((i * 13) % 28),
      delay: (i * 1.7) % 16,
      duration: 16 + ((i * 7) % 14),
      opacity: 0.06 + ((i * 3) % 8) / 100,
    }))
  }, [count])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-primary"
          style={{
            left: `${h.left}%`,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            // custom props consumed by the keyframes
            ['--o' as string]: h.opacity,
            ['--s' as string]: 1,
          }}
        >
          <Heart
            style={{ width: h.size, height: h.size }}
            className="fill-current"
          />
        </span>
      ))}
    </div>
  )
}
