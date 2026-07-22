'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { RunawayNoButton } from './runaway-no-button'
import { useDateStore } from '@/store/use-date-store'
import { fadeUp, staggerContainer } from '@/animations/variants'

export function LandingScreen() {
  const setStage = useDateStore((s) => s.setStage)

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
      className="flex min-h-screen items-center justify-center px-6 py-16"
    >
      <motion.div
        variants={fadeUp}
        className="glass w-full max-w-xl rounded-[var(--radius-2xl)] border border-border p-10 text-center shadow-2xl shadow-primary/10"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground"
        >
          <Heart className="size-4 fill-current" />
          <span>A little something for you</span>
        </motion.div>

        <motion.div variants={fadeUp} className="animate-soft-float mb-6">
          <Image
            src="/images/date-invite.png"
            alt="Illustration of a couple on a cozy cafe date"
            width={360}
            height={360}
            className="mx-auto h-auto w-64 select-none"
            priority
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-heading text-4xl font-extrabold leading-tight text-balance text-foreground"
        >
          Will you go on a date with me?
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-3 max-w-sm text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          I promise it&apos;ll be fun ❤️
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="relative mt-9 flex flex-col items-center justify-center gap-4"
        >
          <AnimatedButton
            size="lg"
            sparkle
            onClick={() => setStage('wizard')}
            className="w-full max-w-xs"
          >
            💕 Yes I&apos;m Free
          </AnimatedButton>
          <RunawayNoButton />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
