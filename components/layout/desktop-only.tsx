'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import { FloatingHearts } from './floating-hearts'
import { AnimatedButton } from '@/components/ui/animated-button'

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop(1024)

  // While measuring, render nothing to avoid a flash of the wrong layout.
  if (isDesktop === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background" />
    )
  }

  if (!isDesktop) {
    return (
      <main className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
        <FloatingHearts count={10} />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="glass flex max-w-md flex-col items-center gap-6 rounded-[var(--radius-xl)] border border-border p-8 shadow-xl shadow-primary/10"
        >
          <div className="animate-soft-float">
            <Image
              src="/images/laptop.png"
              alt="Laptop illustration"
              width={220}
              height={220}
              className="h-auto w-44 select-none"
              priority
            />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-balance text-foreground">
            This experience is designed for desktop.
          </h1>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Please open this website on your laptop or desktop for the complete
            experience ❤️
          </p>
          <AnimatedButton
            onClick={() => window.close()}
            className="mt-2 w-full"
          >
            I&apos;ll Open It Later
          </AnimatedButton>
        </motion.div>
      </main>
    )
  }

  return <>{children}</>
}
