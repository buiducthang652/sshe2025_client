'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import axiosInstance from '@/services/axios'

export default function NewsDetailPage({ params: { lng, documentId } }) {
  const pathname = usePathname()
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState(null)
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'news.categories.news',
      slug: 'news'
    },
    {
      id: 2, 
      name: 'news.categories.cooperation',
      slug: 'cooperation'
    },
    {
      id: 3,
      name: 'news.categories.training', 
      slug: 'training'
    },
    {
      id: 4,
      name: 'news.categories.projects',
      slug: 'projects'
    },
    {
      id: 5,
      name: 'news.categories.networks',
      slug: 'networks'
    }
  ])

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
    async function fetchArticle() {
      try {
        setLoading(true)
        setError(null)
        
        // Call API directly using axiosInstance
        const params = new URLSearchParams({
          locale: lng,
          populate: '*'
        })
        
        const data = await axiosInstance.get(`/news/${documentId}?${params.toString()}`)
        setArticle(data.data)
        
        // Set category based on article data
        if (data.data?.category) {
          setCategory(data.data.category)
        }
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err.message)
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }

    if (documentId) {
      fetchArticle()
    }
  }, [documentId, lng])

  const t = (key) => {
    if (!translations) return key
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  // Function to get category translation key based on slug
  const getCategoryTranslation = (categorySlug) => {
    const categoryMap = {
      'cooperation': 'news.categories.cooperation',
      'training': 'news.categories.training', 
      'projects': 'news.categories.projects',
      'networks': 'news.categories.networks',
      'news': 'news.categories.news'
    }
    return categoryMap[categorySlug] || 'news.categories.news'
  }

  // Function to get translated category name
  const getTranslatedCategoryName = (category) => {
    if (!category) return ''
    // If category.name is already a translation key, use it directly
    if (category.name && category.name.startsWith('news.categories.')) {
      return t(category.name)
    }
    // Otherwise, use the mapping function
    return t(getCategoryTranslation(category.slug))
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="animate-pulse">
              <div className="h-4 w-80 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-64 sm:h-80 lg:h-96 bg-gray-200"></div>
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">{t('news.error')}</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href={`/${lng}/news`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('news.back_to_news')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">{t('news.not_found')}</h1>
            <Link
              href={`/${lng}/news`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('news.back_to_news')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Breadcrumb */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Breadcrumb */}
            <nav className="mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link
                    href={`/${lng}`}
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link
                    href={`/${lng}/news`}
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {t('breadcrumb.news')}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-700 font-medium truncate max-w-xs sm:max-w-sm lg:max-w-md">
                    {article.title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <Link
                href={`/${lng}/news`}
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('news.back_to_news')}
              </Link>

              <div className="flex items-center space-x-3">
                {/* Share Button */}
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {article.thumbnail?.url && (
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <Image
                    src={`https://sshe2025.hnue.edu.vn/v2${article.thumbnail.url}`}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Article Category */}
                  {article.category && (
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                        {getTranslatedCategoryName(article.category)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Article Header */}
              <header className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <time className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(article.updatedAt || article.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{Math.ceil((article.contents?.length || 0) / 1000)} {t('news.minutes')}</span>
                  </div>
                </div>

                {/* Description */}
                {article.description && (
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                      {article.description}
                    </p>
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="px-6 sm:px-8 pb-8">
                {article.contents && (
                  <div
                    className="prose prose-lg max-w-none 
                             prose-headings:text-gray-900 prose-headings:font-bold
                             prose-p:text-gray-700 prose-p:leading-relaxed
                             prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                             prose-strong:text-gray-900 prose-strong:font-semibold
                             prose-ul:text-gray-700 prose-ol:text-gray-700
                             prose-li:text-gray-700 prose-li:leading-relaxed
                             prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                             prose-img:rounded-lg prose-img:shadow-md
                             prose-hr:border-gray-200
                             prose-table:text-sm"
                    dangerouslySetInnerHTML={{ __html: article.contents }}
                  />
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Article Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('news.article_info')}</h3>

              <div className="space-y-4">
                {article.category && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('news.category')}</dt>
                    <dd>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {getTranslatedCategoryName(article.category)}
                      </span>
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">{t('news.published')}</dt>
                  <dd className="text-sm text-gray-700">
                    {new Date(article.updatedAt || article.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">{t('news.read_time')}</dt>
                  <dd className="text-sm text-gray-700">
                    {Math.ceil((article.contents?.length || 0) / 1000)} {t('news.minutes')}
                  </dd>
                </div>
              </div>
            </div>

            {/* Browse Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('news.browse_categories')}</h3>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${lng}/news/${cat.slug}`}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      category?.slug === cat.slug 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {t(cat.name)}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Navigation */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/${lng}/news`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 mb-4 sm:mb-0"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('news.back_to_news')}
            </Link>
            
            <div className="text-sm text-gray-500">
              {t('news.last_updated')}: {new Date(article.updatedAt || article.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}