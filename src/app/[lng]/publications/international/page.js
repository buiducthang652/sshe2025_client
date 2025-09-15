'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { buildImageUrl } from '@/config/constants'
import { usePublications } from '@/hooks/usePublications'
import { usePartners } from '@/hooks/usePartners'

export default function InternationalPublicationsPage({ params: { lng } }) {
  const [translations, setTranslations] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { partners, loading: partnersLoading, error: partnersError } = usePartners()

  const { publications, pagination, loading, error } = usePublications({
    page,
    pageSize: 10,
    search,
    categories: 'quoc-te'
  })

  const categories = [
    { id: 'all', name: 'publications.categories.all', href: `/${lng}/publications` },
    { id: 'viet-nam', name: 'publications.categories.domestic', href: `/${lng}/publications/domestic` },
    { id: 'quoc-te', name: 'publications.categories.international', href: `/${lng}/publications/international` }
  ]

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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('publications.international_title')}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {t('publications.international_subtitle')}
          </p>

          {/* Category Navigation */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={`px-4 py-2 rounded-full ${
                  category.id === 'quoc-te'
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                } transition-colors`}
              >
                {t(category.name)}
              </Link>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {publications.map((publication) => (
            <article 
              key={publication.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Publication Thumbnail */}
              <div className="relative h-65 rounded-t-lg overflow-hidden">
                {publication.thumbnail ? (
                  <img
                    src={buildImageUrl(publication.thumbnail.formats?.medium?.url || publication.thumbnail.url)}
                    alt={publication.thumbnail.alternativeText || publication.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-600">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="inline-block text-white text-xs px-2 py-1 rounded-full bg-orange-600">
                    {t('publications.categories.international')}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                  {publication.title}
                </h3>
                <div className="text-sm text-gray-600 mb-3 line-clamp-3" 
                  dangerouslySetInnerHTML={{ __html: lng === 'en' ? publication.contents_en : publication.contents }} 
                />
                
                <Link
                  href={`/${lng}/publications/${publication.documentId}`}
                  className="w-full text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium bg-orange-600 hover:bg-orange-700 inline-block text-center"
                >
                  {t('publications.view_details')}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.pageCount > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="inline-flex items-center space-x-1" aria-label="Pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {t('publications.pagination.previous')}
              </button>
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${p === page ? 'bg-blue-600 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pageCount}
                className={`px-3 py-1 rounded ${page === pagination.pageCount ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {t('publications.pagination.next')}
              </button>
            </nav>
          </div>
        )}

        {/* International Partners Section */}
        {/* <div className="mt-20 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              {t('publications.partner_organizations')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('publications.partner_description')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-8">
            {partnersLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
                  <div className="w-full h-20 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              ))
            ) : partnersError ? (
              <div className="col-span-full text-center text-red-600">
                <p>{partnersError}</p>
              </div>
            ) : partners?.length > 0 ? (
              partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  {partner.img ? (
                    <div className="relative w-full h-20 mb-2">
                      <img
                        src={buildImageUrl(partner.img.formats?.thumbnail?.url || partner.img.url)}
                        alt={partner.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-20 bg-gray-50 rounded-lg mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  <h3 className="text-sm text-center text-gray-700 font-medium line-clamp-2">
                    {partner.name}
                  </h3>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                <p>Chưa có thông tin đối tác</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
} 