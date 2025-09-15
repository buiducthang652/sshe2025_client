'use client'

import Link from 'next/link'
import { NEWS_MENU_CONFIG } from '@/config/constants'

export default function NewsNavigation({ lng, t, currentCategory = null }) {
  // Lọc các menu items dựa trên cấu hình
  const categories = [
    { id: 'cooperation', name: 'news.categories.cooperation', color: 'green' },
    { id: 'networks', name: 'news.categories.networks', color: 'red' }
  ].filter(category => NEWS_MENU_CONFIG.menuItems[category.id])

  return (
    <div className="flex gap-4 flex-wrap">
      <Link 
        href={`/${lng}/news`}
        className={`px-4 py-2 rounded-full ${
          !currentCategory 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white'
        } transition-colors`}
      >
        {t('news.all')}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${lng}/news/${category.id}`}
          className={`px-4 py-2 rounded-full ${
            currentCategory === category.id
              ? `bg-${category.color}-600 text-white`
              : `bg-gray-200 text-gray-700 hover:bg-${category.color}-700 hover:text-white`
          } transition-colors`}
        >
          {t(category.name)}
        </Link>
      ))}
    </div>
  )
} 