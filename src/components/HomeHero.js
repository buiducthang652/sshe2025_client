'use client'

import { useState, useEffect } from 'react'
import { useBanner } from '@/hooks/useBanner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { buildImageUrl } from '../config/constants'

export default function HomeHero({ locale }) {
  const { banners, loading } = useBanner(locale)
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      if (banners.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [banners.length])

  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const handleBannerClick = (banner) => {
    if (banner.title) {
      if (banner.title.startsWith('http://') || banner.title.startsWith('https://')) {
        window.open(banner.title, '_blank')
      } else {
        router.push(banner.title)
      }
    }
  }

  if (loading || !banners || banners.length === 0) {
    return (
      <div className="w-full bg-gray-200 animate-pulse" style={{ aspectRatio: '1600/610' }} />
    )
  }

  return (
    <div className="w-full bg-[#0066CC]">
      {/* Slides Container */}
      <div className="relative w-full mx-auto max-w-[1920px]">
        <div className="relative w-full" style={{ aspectRatio: '1600/610' }}>
          {banners.map((banner, index) => {
            const bannerImage = banner.banner?.[0]
            const imageUrl = bannerImage?.url

            return (
              <div
                key={banner.id}
                onClick={() => banner.title && handleBannerClick(banner)}
                className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${banner.title ? 'cursor-pointer' : ''} ${
                  index === currentSlide ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                {imageUrl && (
                  <img
                    src={buildImageUrl(imageUrl)}
                    alt={bannerImage?.alternativeText || ''}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
              </div>
            )
          })}

          {/* Navigation Buttons */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-10 group"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-10 group"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentSlide(index)
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 