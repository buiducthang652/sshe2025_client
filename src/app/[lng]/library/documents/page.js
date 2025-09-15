'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLibrary } from '@/hooks/useLibrary'
import { buildImageUrl } from '@/config/constants'
import Image from 'next/image'

export default function LibraryDocumentsPage({ params: { lng } }) {
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  
  const { documents, pagination, loading } = useLibrary({
    pageSize: 12,
    page,
    category: 'documents'
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

  const getFileIcon = (mime) => {
    const iconMap = {
      'application/pdf': (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }

    return iconMap[mime] || (
      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }

  if (loading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('menu.library_items.documents')}
          </h1>

          {/* Category Navigation */}
          <div className="flex gap-4 flex-wrap">
            <Link 
              href={`/${lng}/library`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white transition-colors"
            >
              {t('library.categories.all')}
            </Link>
            <Link
              href={`/${lng}/library/documents`}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {t('menu.library_items.documents')}
            </Link>
            <Link
              href={`/${lng}/library/photos`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-purple-700 hover:text-white transition-colors"
            >
              {t('menu.library_items.photos')}
            </Link>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {documents && documents.map((doc) => (
            <article 
              key={doc.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-col sm:items-start sm:space-x-4 md:space-x-0 lg:space-x-0">
                  {doc.content && doc.content[0] && (
                    <div className="relative w-full h-48 sm:w-48 md:w-full lg:w-full sm:h-48 md:h-56 lg:h-64 flex-shrink-0 mb-4">
                      {doc?.thumbnail?.url ? (
                        <Image
                          src={buildImageUrl(doc.thumbnail.url)}
                          alt={doc.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 384px"
                          quality={100}
                          loading="eager"
                          priority={true}
                          style={{ objectFit: 'cover' }}
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                          {getFileIcon(doc.content[0].mime)}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {new Date(doc.ngay_dang || doc.updatedAt || doc.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {doc.content && doc.content[0] && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-4">
                      <p className="mb-1 truncate">
                        <span className="font-medium">{t('library.fileName')}:</span> {doc.content[0].name}
                      </p>
                      <p>
                        <span className="font-medium">{t('library.fileType')}:</span> {doc.content[0].mime.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <a
                        href={buildImageUrl(doc.content[0].url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t('library.download')}
                      </a>
                      <span className="text-sm text-gray-500">
                        {(doc.content[0].size / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {documents && documents.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('library.noDocuments')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('library.noDocumentsDesc')}</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  page === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">{t('library.pagination.previous')}</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {t('library.pagination.page')} {page} {t('library.pagination.of')} {pagination.pageCount}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pageCount}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  page === pagination.pageCount
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">{t('library.pagination.next')}</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  )
} 