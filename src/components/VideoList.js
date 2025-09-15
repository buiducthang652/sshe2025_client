'use client'

import { useState } from 'react'
import { useVideos } from '@/hooks/useVideos'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getVideoEmbedUrl } from '@/utils/video'

export default function VideoList({ selectedYear = 'all', selectedSchool = 'all', t }) {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [page, setPage] = useState(1)
  
  const { videos, pagination, loading, error } = useVideos({ 
    page, 
    year: selectedYear !== 'all' ? selectedYear : '',
    school: selectedSchool !== 'all' ? selectedSchool : ''
  })

  const renderVideoPlayer = (url) => {
    const { embedUrl, type } = getVideoEmbedUrl(url);

    if (type === 'direct') {
      return (
        <video
          src={embedUrl}
          controls
          className="absolute inset-0 w-full h-full"
        />
      );
    }

    return (
      <iframe
        src={embedUrl}
        title="Video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        {t('videos.error')}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {t('videos.showing')} <span className="font-semibold text-gray-900">{videos.length}</span> {t('videos.videos')}
            {selectedYear !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {t(`videos.years.${selectedYear}`)}
              </span>
            )}
            {selectedSchool !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                {t(`videos.schools.${selectedSchool}`)}
              </span>
            )}
          </p>
          {(selectedYear !== 'all' || selectedSchool !== 'all') && (
            <button
              onClick={() => {
                setPage(1)
              }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t('videos.clear_filters')}
            </button>
          )}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-video relative">
              {renderVideoPlayer(video.url)}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {video.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 items-center text-sm text-gray-500">
                <span>{new Date(video.ngay_dang || video.updatedAt || video.publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>•</span>
                <span className="text-blue-600">{t(`videos.schools.${video.school}`)}</span>
                <Link
                  href={`/${lng}/videos/${video.documentId}`}
                  className="ml-auto text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('videos.view_details')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {videos.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('videos.no_results')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('videos.try_different_filters')}</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pageCount > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            {t('common.previous')}
          </button>
          <span className="px-4 py-2 text-gray-600">
            {t('common.page')} {page} {t('common.of')} {pagination.pageCount}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pageCount}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  )
} 