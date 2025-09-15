'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLibrary } from '@/hooks/useLibrary'
import { buildImageUrl } from '@/config/constants'

const categories = [
  { id: 'hoithao2018', name: 'Hội Thảo 2018 (Hà Nội)', value: 'hoithao2018' },
  { id: 'hoithao2022', name: 'Hội Thảo 2022 (Paris)', value: 'hoithao2022' },
  { id: 'toadamkhoahoc', name: 'Toạ đàm khoa học', value: 'toadamkhoahoc' },
  { id: 'hoithaoquocte', name: 'Hoạt động quốc tế', value: 'hoithaoquocte' }
];

const getFileIcon = (mime) => {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

export default function LibraryPhotosPage({ params: { lng } }) {
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const { documents, pagination, loading } = useLibrary({
    pageSize: 12,
    page,
    category: 'album',
    filters: selectedCategory ? { category_album: selectedCategory } : {}
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

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue)
    setPage(1) // Reset page when changing category
  }

  if (loading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
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
            {t('menu.library_items.photos')}
          </h1>

          {/* Category Navigation */}
          <div className="flex gap-4 flex-wrap mb-8">
            <Link
              href={`/${lng}/library`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white transition-colors"
            >
              {t('library.categories.all')}
            </Link>
            <Link
              href={`/${lng}/library/documents`}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-700 hover:text-white transition-colors"
            >
              {t('menu.library_items.documents')}
            </Link>
            <Link
              href={`/${lng}/library/photos`}
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              {t('menu.library_items.photos')}
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">{t('menu.categories')}</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryClick('')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                        selectedCategory === '' 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      {t('library.categories.all')}
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryClick(cat.value)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                          selectedCategory === cat.value 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {selectedCategory && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {categories.find(cat => cat.value === selectedCategory)?.name}
                </h2>
              </div>
            )}

            {/* Albums Grid */}
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
                            <Image
                              src={buildImageUrl(doc.content[0].url)}
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
                            <span className="font-medium">{t('library.photoCount')}:</span> {doc.content.length}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/${lng}/library/photos/${doc.documentId}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {t('library.viewAlbum')}
                          </Link>
                          <span className="text-sm text-gray-500">
                            {doc.content.length} {t('library.photoCount')}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">{t('library.noPhotos')}</h3>
                <p className="mt-1 text-sm text-gray-500">{t('library.noPhotosDesc')}</p>
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
                    } transition-colors`}
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
                    } transition-colors`}
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
        </div>
      </div>
    </section>
  )
} 