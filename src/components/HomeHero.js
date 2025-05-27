'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function HomeHero() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638681904264481281_ec13dbed3f.webp',
      link: `/${lng}/register`,
      alt: 'Đăng ký tham dự hội nghị SSHE2025'
    },
    {
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638681904264481281_ec13dbed3f.webp',
      link: `/${lng}/schedule`,
      alt: 'Lịch trình hội nghị SSHE2025'
    },
    {
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638681904264481281_ec13dbed3f.webp',
      link: `/${lng}/partners`,
      alt: 'Đối tác hội nghị SSHE2025'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[600px] lg:h-[800px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <Link
          key={index}
          href={slide.link}
          className={`block absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority
          />
        </Link>
      ))}

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              goToSlide(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.preventDefault()
          goToSlide((currentSlide - 1 + slides.length) % slides.length)
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          goToSlide((currentSlide + 1) % slides.length)
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
} 