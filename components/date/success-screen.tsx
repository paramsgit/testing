'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { motion } from 'motion/react'
import { Heart, RotateCcw } from 'lucide-react'
import { useDateStore } from '@/store/use-date-store'
import { SummaryCard } from './summary-card'
import { AnimatedButton } from '@/components/ui/animated-button'
import { fadeUp, staggerContainer } from '@/animations/variants'

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

export function SuccessScreen() {
  const reset = useDateStore((s) => s.reset)
  const { width, height } = useWindowSize()
  const [pieces, setPieces] = useState(320)

  // Gently fade the confetti out after the initial celebration.
  useEffect(() => {
    const t = window.setTimeout(() => setPieces(0), 6000)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen items-center justify-center px-6 py-14"
    >
      {width > 0 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={pieces}
          recycle={pieces > 0}
          colors={['#FF4D8D', '#FFA7C4', '#F4D9E2', '#ffffff']}
          gravity={0.18}
        />
      )}

      <motion.div
        variants={fadeUp}
        className="glass w-full max-w-xl rounded-[var(--radius-2xl)] border border-border p-10 text-center shadow-2xl shadow-primary/10"
      >
        <motion.div
          variants={fadeUp}
          className="animate-soft-float mb-4"
        >
          <Image
            src="/images/success.png"
            alt="Illustration of a happy couple celebrating"
            width={340}
            height={340}
            className="mx-auto h-auto w-56 select-none"
            priority
          />
        </motion.div>

        <motion.div
          className="mx-auto mb-4 inline-flex"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="size-10 fill-primary text-primary" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-heading text-4xl font-extrabold text-balance text-foreground"
        >
          It&apos;s a Date! 🎉
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground"
        >
          I can&apos;t wait to spend this time with you. Here&apos;s what we
          planned together.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 text-left">
          <SummaryCard />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex justify-center">
          <AnimatedButton onClick={reset}>
            <RotateCcw className="size-4" />
            Plan Another Date
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
