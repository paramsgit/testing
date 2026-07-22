'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { useDateStore } from '@/store/use-date-store'
import { Background } from '@/components/layout/background'
import { LandingScreen } from './landing-screen'
import { Wizard } from './wizard'
import { SuccessScreen } from './success-screen'
import { HeartSpinner } from '@/components/ui/heart-spinner'

export function DateExperience() {
  const stage = useDateStore((s) => s.stage)
  const [hydrated, setHydrated] = useState(false)

  // Wait for zustand's persisted state to rehydrate before rendering,
  // so the correct stage shows without a flash / hydration mismatch.
  useEffect(() => setHydrated(true), [])

  return (
    <main className="relative min-h-screen">
      <Background />
      {!hydrated ? (
        <div className="flex min-h-screen items-center justify-center">
          <HeartSpinner />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {stage === 'landing' && <LandingScreen key="landing" />}
          {stage === 'wizard' && <Wizard key="wizard" />}
          {stage === 'success' && <SuccessScreen key="success" />}
        </AnimatePresence>
      )}
    </main>
  )
}
