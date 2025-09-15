'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePublications } from '@/hooks/usePublications'
import { buildImageUrl } from '@/config/constants'

export default function PublicationCategories({ locale }) {
  const [activeTab, setActiveTab] = useState('domestic')
  const { publications, loading, error } = usePublications({
    page: 1,
    pageSize: 6,
    categories: activeTab === 'domestic' ? 'viet-nam' : 'quoc-te'
  })

  const categories = [
    {
      id: 'domestic',
      title: {
        vi: 'Trong nước',
        en: 'Domestic'
      },
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      activeClass: 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20',
      hoverClass: 'hover:border-blue-600 hover:text-blue-600'
    },
    {
      id: 'international',
      title: {
        vi: 'Quốc tế',
        en: 'International'
      },
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      activeClass: 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20',
      hoverClass: 'hover:border-emerald-600 hover:text-emerald-600'
    }
  ]

  return (
    <section className="py-20 from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            {locale === 'vi' ? 'Hợp tác xuất bản' : 'Publications'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {locale === 'vi' ? 'Các ấn phẩm và xuất bản phẩm trong nước và quốc tế' : 'Domestic and international publications'}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`inline-flex items-center px-8 py-4 border-2 rounded-xl text-base font-semibold transition-all duration-200 ${
                activeTab === category.id
                  ? category.activeClass
                  : `bg-white border-gray-200 text-gray-700 ${category.hoverClass}`
              }`}
            >
              <span className="mr-3">{category.icon}</span>
              <span>{category.title[locale]}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-xl"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Đã có lỗi xảy ra</h3>
            <p className="text-gray-600">Vui lòng thử lại sau</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && (!publications || publications.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'vi' ? 'Chưa có ấn phẩm nào' : 'No publications yet'}
            </h3>
            <p className="text-gray-600">
              {locale === 'vi' ? 'Vui lòng quay lại sau' : 'Please check back later'}
            </p>
          </div>
        )}

        {/* Publications Grid */}
        {!loading && !error && publications && publications.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {publications.map((publication) => (
              <Link
                key={publication.id}
                href={`/${locale}/publications/${publication.documentId}`}
                className="group relative"
              >
                <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-4px]">
                  {publication.thumbnail ? (
                    <div className="relative w-full h-full">
                      <img
                        src={buildImageUrl(publication.thumbnail.formats?.medium?.url || publication.thumbnail.url)}
                        alt={publication.thumbnail.alternativeText || publication.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 text-center">
                    {publication.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 