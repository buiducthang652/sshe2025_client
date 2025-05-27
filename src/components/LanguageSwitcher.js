'use client'

import { usePathname, useRouter } from 'next/navigation'
import { languages } from '@/i18n/settings'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLang = pathname.split('/')[1]

  const switchLanguage = (newLang) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`)
    router.push(newPathname)
  }

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          className={`px-2 py-1 text-sm rounded-md transition-colors ${
            currentLang === lang
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
} 