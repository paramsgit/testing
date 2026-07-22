import type { Variants, Transition } from 'motion/react'

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springSoft },
  exit: { opacity: 0, y: -24, transition: { duration: 0.25 } },
}

export const stepSlide: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: { opacity: 1, x: 0, transition: springSoft },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.25 },
  }),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export const popItem: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSoft },
}
