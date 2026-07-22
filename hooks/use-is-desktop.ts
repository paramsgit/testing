'use client'

import { useEffect, useState } from 'react'

/**
 * Returns whether the viewport is at least `breakpoint` px wide.
 * `undefined` while the value is still being measured on the client,
 * so consumers can render a neutral state and avoid hydration mismatches.
 */
export function useIsDesktop(breakpoint = 1024): boolean | undefined {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [breakpoint])

  return isDesktop
}
