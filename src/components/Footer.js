'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Footer() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)

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

  if (isLoading) {
    return (
      <footer className="bg-gray-900">
        <div className="animate-pulse h-48"></div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Top Wave SVG */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none w-full">
        <svg className="relative block w-full h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[64rem]:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 min-[64rem]:col-span-1">
            <Link href={`/${lng}`} className="inline-block">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-xl bg-white text-gray-900 flex items-center justify-center">
                  <span className="text-xl font-bold">SS</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">SSHE2025</h2>
                  <p className="text-gray-400 text-sm">{t('footer.conference_name')}</p>
                </div>
              </div>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-md">
              {t('footer.organized_by')}: {t('footer.hanoi_university')}
            </p>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.follow_us')}</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.quick_links')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lng}/news`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">{t('menu.news')}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/videos`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">{t('menu.videos')}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/publications`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">{t('menu.publications')}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/library`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">{t('menu.library')}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="flex-1">
                  136 Xuân Thủy, Cầu Giấy<br />
                  Hà Nội, Việt Nam
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+84 24 3754 7823</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>sshe2025@hnue.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col min-[64rem]:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
            <div className="mt-4 min-[64rem]:mt-0">
              <Link href={`/${lng === 'vi' ? 'en' : 'vi'}`} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                {lng === 'vi' ? 'English' : 'Tiếng Việt'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
