import { DesktopOnly } from '@/components/layout/desktop-only'
import { DateExperience } from '@/components/date/date-experience'

export default function Page() {
  return (
    <DesktopOnly>
      <DateExperience />
    </DesktopOnly>
  )
}
