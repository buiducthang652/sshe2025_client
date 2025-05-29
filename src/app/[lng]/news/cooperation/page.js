'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function CooperationPage({ params: { lng } }) {
  const pathname = usePathname()
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [news, setNews] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    async function fetchCooperationNews() {
      try {
        setLoading(true)
        const response = await fetch('/api/categories/wv09u0dokpwnftpbkgurqrto')
        
        if (!response.ok) {
          throw new Error('Failed to fetch cooperation news')
        }
        
        const result = await response.json()
        const categoryData = result.data
        
        // Filter news by locale
        const filteredNews = categoryData.tin_tucs?.filter(item => item.locale === lng) || []
        
        setCategory(categoryData)
        setNews(filteredNews)
      } catch (err) {
        console.error('Error fetching cooperation news:', err)
        setNews([])
        setCategory(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCooperationNews()
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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="flex gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
            ))}
          </div>
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
            {category?.name || t('news.categories.cooperation')}
          </h1>
          <div className="flex gap-4 flex-wrap">
            <Link 
              href={`/${lng}/news`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white transition-colors"
            >
              {t('news.all')}
            </Link>
            <Link
              href={`/${lng}/news/cooperation`}
              className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              {t('news.categories.cooperation')}
            </Link>
            <Link
              href={`/${lng}/news/training`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-purple-700 hover:text-white transition-colors"
            >
              {t('news.categories.training')}
            </Link>
            <Link
              href={`/${lng}/news/projects`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-orange-700 hover:text-white transition-colors"
            >
              {t('news.categories.projects')}
            </Link>
            <Link
              href={`/${lng}/news/networks`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-red-700 hover:text-white transition-colors"
            >
              {t('news.categories.networks')}
            </Link>
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
                  {item.thumbnail?.url ? (
                    <Image
                      src={`https://sshe2025.hnue.edu.vn/v2${item.thumbnail.url}`}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={item.id <= 4}
                      className="object-cover"
                      loading={item.id <= 4 ? "eager" : "lazy"}
                      quality={75}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                      {category?.name || t('news.categories.cooperation')}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {item.description}
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

        {news.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('news.no_articles')}</p>
          </div>
        )}
      </div>
    </section>
  )
} 