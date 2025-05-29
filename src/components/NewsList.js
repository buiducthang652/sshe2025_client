'use client'

import { useEffect, useState } from 'react'
import { useNews } from '@/hooks/useNews'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function NewsList({ category = null }) {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const { news, pagination, loading } = useNews({
    locale: lng,
    pageSize: 12,
    page,
    ...(category && { category })
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

  const categoryTitles = {
    cooperation: t('news.categories.cooperation'),
    training: t('news.categories.training'),
    projects: t('news.categories.projects'),
    networks: t('news.categories.networks')
  }

  if (loading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category ? categoryTitles[category] : t('news.latest')}
          </h1>
          <div className="flex gap-4 flex-wrap">
            <Link 
              href={`/${lng}/news`}
              className={`px-4 py-2 rounded-full ${!category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition-colors`}
            >
              {t('news.all')}
            </Link>
            {Object.entries(categoryTitles).map(([key, value]) => (
              <Link
                key={key}
                href={key === 'news' ? `/${lng}/news` : `/${lng}/news/${key}`}
                className={`px-4 py-2 rounded-full ${category === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition-colors`}
              >
                {value}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {news.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/${lng}/news/${item.documentId}`}>
                <div className="relative h-40 rounded-t-lg overflow-hidden">
                  <Image
                    src={`https://sshe2025.hnue.edu.vn/v2${item.thumbnail?.url}`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={item.id <= 4}
                    className="object-cover"
                    loading={item.id <= 4 ? "eager" : "lazy"}
                    quality={75}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                      {categoryTitles[item.category] || t('news.categories.news')}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.excerpt || item.description}
                  </p>
                  <time className="text-sm text-gray-500">
                    {new Date(item.updatedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
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