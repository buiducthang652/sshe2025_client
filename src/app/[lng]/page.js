'use client'

import HomeHero from '@/components/HomeHero'
import HomeNewsList from '@/components/HomeNewsList'
import { usePathname } from 'next/navigation'

export default function Home() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]

  return (
    <main>
      <HomeHero locale={lng} />
      <HomeNewsList locale={lng} />
    </main>
  )
} 