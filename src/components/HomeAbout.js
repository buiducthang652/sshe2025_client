'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAbout } from '@/hooks/useAbout'
import { useState, useEffect } from 'react'

export default function HomeAbout() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [translations, setTranslations] = useState({})
  const { content, content_en, loading, error } = useAbout({ locale: lng, isHomePage: true })

  useEffect(() => {
    async function loadTranslations() {
      try {
        const response = await import(`@/../../public/locales/${lng}/common.json`)
        setTranslations(response.default || {})
      } catch (error) {
        console.error('Error loading translations:', error)
        setTranslations({})
      }
    }
    loadTranslations()
  }, [lng])

  const t = (key) => {
    if (!translations) return key
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  if (loading) {
    return (
      <section className="py-9">
        <div className="container mx-auto px-4">
          <div className="animate-pulse mx-auto">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return null
  }

  return (
    <section className="py-9">
      <div className="container mx-auto px-4">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.about_title')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h4:text-base prose-h4:uppercase prose-h4:text-gray-600 prose-h4:tracking-wider
                  prose-h2:text-2xl prose-h2:text-gray-800 prose-h2:leading-tight
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-base
                  prose-ul:text-gray-600 prose-ul:text-base
                  prose-li:mb-2
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: lng === 'en' ? content_en : content }}
              />

              <div className="mt-8 flex justify-center">
                <Link
                  href={`/${lng}/about`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {t('common.read_more')}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 