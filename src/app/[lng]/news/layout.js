'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { NEWS_MENU_CONFIG } from '@/config/constants'

export default function NewsLayout({ children, params: { lng } }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Kiểm tra xem route hiện tại có phải là route bị ẩn không
    const currentRoute = pathname.split('/').pop()
    if (currentRoute && NEWS_MENU_CONFIG.menuItems.hasOwnProperty(currentRoute)) {
      if (!NEWS_MENU_CONFIG.menuItems[currentRoute]) {
        router.replace(`/${lng}/news`)
      }
    }
  }, [pathname, router, lng])

  return <>{children}</>
} 