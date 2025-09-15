'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAbout } from '@/hooks/useAbout'
import { usePartners } from '@/hooks/usePartners'
import { buildImageUrl } from '@/config/constants'

export default function AboutPage({ params: { lng } }) {
  const pathname = usePathname()
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { content, content_en, loading: contentLoading, error } = useAbout({ locale: lng })
  const { partners, loading: partnersLoading, error: partnersError } = usePartners()

  // Add this to your component to share with layout
  useEffect(() => {
    // Dispatch custom event to notify layout about current page
    const event = new CustomEvent('navigationStateChange', {
      detail: { currentPath: pathname }
    })
    window.dispatchEvent(event)
  }, [pathname])

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

  if (isLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-4 w-80 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-96 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="animate-pulse p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    )
  }

  const displayContent = lng === 'en' ? content_en : content

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Breadcrumb */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
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
                  <span className="text-gray-700">{t('menu.about')}</span>
                </li>
              </ol>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900">
              {t('menu.about')}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              {displayContent ? (
                <div 
                  className="prose prose-lg max-w-none w-full
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:text-gray-700 prose-ol:text-gray-700
                    prose-li:text-gray-700 prose-li:leading-relaxed
                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4
                    prose-img:shadow-md
                    prose-hr:border-gray-200
                    prose-table:text-sm"
                  dangerouslySetInnerHTML={{ __html: displayContent }}
                />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  {t('common.no_content')}
                </div>
              )}
            </div>
          </div>

          {/* International Partners Section */}
          {/* <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
                {lng === 'vi' ? 'Đối tác Quốc tế' : 'International Partners'}
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {lng === 'vi' 
                  ? 'Các đối tác học thuật và tổ chức quốc tế đã và đang hợp tác với chúng tôi'
                  : 'Our academic partners and international organizations that collaborate with us'
                }
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {partnersLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white p-4 shadow-sm animate-pulse">
                    <div className="w-full h-20 bg-gray-200 mb-2"></div>
                    <div className="h-4 bg-gray-200 w-3/4 mx-auto"></div>
                  </div>
                ))
              ) : partnersError ? (
                <div className="col-span-full text-center text-red-600">
                  <p>{partnersError}</p>
                </div>
              ) : partners?.length > 0 ? (
                partners.map((partner) => (
                  <div key={partner.id} className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    {partner.img ? (
                      <div className="relative w-full h-20 mb-2">
                        <img
                          src={buildImageUrl(partner.img.formats?.thumbnail?.url || partner.img.url)}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-20 bg-gray-50 mb-2 flex items-center justify-center">
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
                  <p>{lng === 'vi' ? 'Chưa có thông tin đối tác' : 'No partner information available'}</p>
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
    </div>
  )
} 