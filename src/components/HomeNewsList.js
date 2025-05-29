'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useNews } from '@/hooks/useNews'

export default function HomeNewsList({ locale }) {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const { news, pagination, loading } = useNews({
    locale,
    pageSize: 12,
    page,
  })

  useEffect(() => {
    async function loadTranslations() {
      try {
        setIsLoading(true)
        const response = await import(`@/../../public/locales/${lng}/common.json`)
        setTranslations(response.default || {})
      } catch (error) {
        console.error('Error loading translations:', error)
        setTranslations({})
      } finally {
        setIsLoading(false)
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

  if (loading || isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-96 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-12 w-40 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="animate-pulse bg-white rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{t('news.latest')}</h2>
            <p className="mt-2 text-gray-600">{t('news.description')}</p>
          </div>
          <Link
            href={`/${lng}/news`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            {t('news.view_all')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group">
              <Link href={`/${lng}/news/${item.documentId}`}>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={`https://sshe2025.hnue.edu.vn/v2${item.thumbnail?.url}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(item.updatedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {item.excerpt || item.description}
                  </p>
                  <div className="inline-flex items-center text-sm text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    {t('news.read_more')}
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {pagination && pagination.pageCount > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              {Array.from({ length: pagination.pageCount }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    i === 0 ? 'rounded-l-md' : ''
                  } ${
                    i === pagination.pageCount - 1 ? 'rounded-r-md' : ''
                  } ${
                    page === i + 1
                      ? 'z-10 bg-blue-600 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  } border border-gray-300`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 