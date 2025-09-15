'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import axiosInstance from '@/services/axios'
import { buildImageUrl } from '../../../../config/constants'

export default function PublicationDetailPage({ params: { lng, documentId } }) {
  const pathname = usePathname()
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [publication, setPublication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState(null)
  const [relatedPublications, setRelatedPublications] = useState([])
  const [categories] = useState([
    {
      id: 1,
      name: 'publications.categories.domestic',
      slug: 'viet-nam'
    },
    {
      id: 2,
      name: 'publications.categories.international',
      slug: 'quoc-te'
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
    async function fetchPublication() {
      try {
        setLoading(true)
        setError(null)

        const response = await axiosInstance.get(`/publishing-cooperation/${documentId}`, {
          params: {
            populate: '*'
          }
        })
        
        setPublication(response.data)

        if (response.data?.categories) {
          setCategory(response.data.categories)
          
          // Fetch related publications
          try {
            const relatedResponse = await axiosInstance.get(`/publishing-cooperation`, {
              params: {
                populate: '*',
                'filters[categories][$eq]': response.data.categories,
                'filters[documentId][$ne]': documentId,
                'pagination[limit]': 3,
                'sort[0]': 'publishedAt:desc'
              }
            })
            console.log('Related publications response:', relatedResponse)
            if (relatedResponse?.data) {
              setRelatedPublications(relatedResponse.data)
            }
          } catch (relatedErr) {
            console.error('Error fetching related publications:', relatedErr)
          }
        }
      } catch (err) {
        console.error('Error fetching publication:', err)
        setError(err.message)
        setPublication(null)
      } finally {
        setLoading(false)
      }
    }

    if (documentId) {
      fetchPublication()
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
      'viet-nam': 'publications.categories.domestic',
      'quoc-te': 'publications.categories.international'
    }
    return categoryMap[categorySlug] || 'publications.categories.domestic'
  }

  // Function to get translated category name
  const getTranslatedCategoryName = (category) => {
    if (!category) return ''
    if (category.name && category.name.startsWith('publications.categories.')) {
      return t(category.name)
    }
    return t(getCategoryTranslation(category))
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="animate-pulse">
              <div className="h-4 w-80 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

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
            <h1 className="text-xl font-bold text-gray-900 mb-4">{t('publications.error')}</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href={`/${lng}/publications`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('publications.back_to_list')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!publication) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">{t('publications.not_found')}</h1>
            <Link
              href={`/${lng}/publications`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('publications.back_to_list')}
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
                    {t('breadcrumb.home')}
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link
                    href={`/${lng}/publications`}
                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {t('breadcrumb.publications')}
                  </Link>
                </li>
                {category && (
                  <>
                    <li>
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </li>
                    <li>
                      <Link
                        href={`/${lng}/publications/${category === 'viet-nam' ? 'domestic' : 'international'}`}
                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        {t(`publications.categories.${category === 'viet-nam' ? 'domestic' : 'international'}`)}
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-700 font-medium truncate max-w-xs sm:max-w-sm lg:max-w-md">
                    {publication.title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <Link
                href={`/${lng}/publications`}
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('publications.back_to_list')}
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
          {/* Publication Content */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {publication.thumbnail?.url && (
                <div className="relative w-full aspect-[4/6] overflow-hidden">
                  <Image
                    src={buildImageUrl(publication.thumbnail.url)}
                    alt={publication.title}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Publication Category */}
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${publication.categories === 'viet-nam'
                        ? 'bg-green-600 text-white'
                        : 'bg-orange-600 text-white'
                      }`}>
                      {getTranslatedCategoryName(publication.categories)}
                    </span>
                  </div>
                </div>
              )}

              {/* Publication Header */}
              <header className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  {publication.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  {publication.publicationDate && (
                    <time className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(publication.ngay_dang || publication.publicationDate || publication.updatedAt || publication.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}

                  {publication.publisher && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{publication.publisher}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {publication.description && (
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                      {publication.description}
                    </p>
                  </div>
                )}
              </header>

              {/* Publication Content */}
              <div className="px-6 sm:px-8 pb-8">
                {(lng === 'en' ? publication.contents_en : publication.contents) && (
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
                    dangerouslySetInnerHTML={{ __html: lng === 'en' ? publication.contents_en : publication.contents }}
                  />
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Publication Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('publications.detail.info')}</h3>

              <div className="space-y-4">
                {/* Category */}
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.category')}</dt>
                  <dd>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${publication.categories === 'viet-nam'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                      }`}>
                      {getTranslatedCategoryName(publication.categories)}
                    </span>
                  </dd>
                </div>

                {/* Authors */}
                {publication.authors && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.authors')}</dt>
                    <dd className="text-sm text-gray-700">{publication.authors}</dd>
                  </div>
                )}

                {/* Publication Date */}
                {publication.publicationDate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.publication_date')}</dt>
                    <dd className="text-sm text-gray-700">
                      {new Date(publication.ngay_dang || publication.publicationDate || publication.updatedAt || publication.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </dd>
                  </div>
                )}

                {/* Publisher */}
                {publication.publisher && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.publisher')}</dt>
                    <dd className="text-sm text-gray-700">{publication.publisher}</dd>
                  </div>
                )}

                {/* DOI */}
                {publication.doi && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.doi')}</dt>
                    <dd>
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {publication.doi}
                      </a>
                    </dd>
                  </div>
                )}

                {/* ISBN */}
                {publication.isbn && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.isbn')}</dt>
                    <dd className="text-sm text-gray-700">{publication.isbn}</dd>
                  </div>
                )}

                {/* Pages */}
                {publication.pages && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.pages')}</dt>
                    <dd className="text-sm text-gray-700">{publication.pages}</dd>
                  </div>
                )}

                {/* Language */}
                {publication.language && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">{t('publications.detail.language')}</dt>
                    <dd className="text-sm text-gray-700">{publication.language}</dd>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-4">
                {/* Download */}
                {publication.downloadUrl && (
                  <a
                    href={publication.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white transition-colors ${publication.categories === 'viet-nam'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-orange-600 hover:bg-orange-700'
                      }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t('publications.detail.download')}
                  </a>
                )}

                {/* Cite */}
                <button
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => {/* Implement cite functionality */ }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {t('publications.detail.cite')}
                </button>

                {/* Share */}
                <button
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => {/* Implement share functionality */ }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  {t('publications.detail.share')}
                </button>
              </div>
            </div>

            {/* Browse Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('publications.detail.browse_categories')}</h3>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${lng}/publications${cat.slug === 'viet-nam' ? '/domestic' : cat.slug === 'quoc-te' ? '/international' : ''}`}
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${category === cat.slug
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
              {/* Related Publications */}
              {relatedPublications && relatedPublications.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('publications.detail.related_publications')}</h3>
                  <div className="space-y-4">
                    {relatedPublications.map((pub) => (
                      <Link
                        key={pub.id}
                        href={`/${lng}/publications/${pub.documentId}`}
                        className="block group"
                      >
                        <div className="flex items-start space-x-4">
                          {pub.thumbnail && (
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={buildImageUrl(pub.thumbnail.formats?.thumbnail?.url || pub.thumbnail.url)}
                                alt={pub.title}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                              {pub.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {new Date(pub.ngay_dang || pub.updatedAt || pub.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
          </aside>
        </div>
      </main>

      {/* Footer Navigation */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/${lng}/publications`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 mb-4 sm:mb-0"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('publications.back_to_list')}
            </Link>

            <div className="text-sm text-gray-500">
              {t('publications.detail.last_updated')}: {new Date(publication.ngay_dang || publication.updatedAt || publication.publishedAt || publication.createdAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 