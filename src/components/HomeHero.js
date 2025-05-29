'use client'

import { useState, useEffect } from 'react'
import { useBanner } from '@/hooks/useBanner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
      <section className="relative bg-gray-200 animate-pulse h-[600px]" />
    )
  }

  return (
    <section className="relative h-[600px]">
      {/* Slides */}
      <div className="relative h-full">
        {banners.map((banner, index) => {
          const bannerImage = banner.banner?.[0]
          const imageUrl = bannerImage?.url

          return (
            <div
              key={banner.id}
              onClick={() => banner.title && handleBannerClick(banner)}
              className={`absolute inset-0 transition-all duration-700 ${banner.title ? 'cursor-pointer' : ''} ${
                index === currentSlide ? 'block opacity-100' : 'hidden opacity-0'
              }`}
            >
              {imageUrl && (
                <img
                  src={`https://sshe2025.hnue.edu.vn/v2${imageUrl}`}
                  alt={bannerImage?.alternativeText || ''}
                  className="w-full h-full object-cover"
                  priority="true"
                  loading="eager"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSlide(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
} 