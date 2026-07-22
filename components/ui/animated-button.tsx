'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'default' | 'lg'

interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
  size?: Size
  sparkle?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40',
  outline:
    'border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground',
  ghost: 'bg-transparent text-primary hover:bg-accent',
}

const sizeClasses: Record<Size, string> = {
  default: 'h-11 px-6 text-sm',
  lg: 'h-14 px-9 text-lg',
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(function AnimatedButton(
  {
    className,
    variant = 'primary',
    size = 'default',
    sparkle = false,
    children,
    disabled,
    ...props
  },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      disabled={disabled}
      className={cn(
        'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-heading font-semibold outline-none transition-colors',
        'focus-visible:ring-4 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {sparkle && (
        <>
          <Sparkles className="animate-sparkle absolute left-3 top-2 size-3.5 text-primary-foreground/80" />
          <Sparkles className="animate-sparkle absolute bottom-2 right-4 size-3 text-primary-foreground/70 [animation-delay:0.6s]" />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 z-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
      )}
    </motion.button>
  )
})
