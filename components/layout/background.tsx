'use client'

import { FloatingHearts } from './floating-hearts'

/**
 * Full-screen ambient background: soft gradient blobs + floating hearts.
 * Rendered once behind the whole app.
 */
export function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        <div className="animate-blob absolute -left-24 top-[-10%] h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="animate-blob absolute right-[-8%] top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl [animation-delay:4s]" />
        <div className="animate-blob absolute bottom-[-12%] left-1/3 h-96 w-96 rounded-full bg-secondary/25 blur-3xl [animation-delay:8s]" />
      </div>
      <FloatingHearts />
    </>
  )
}
