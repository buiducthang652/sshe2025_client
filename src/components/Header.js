'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import '@/styles/menu-animations.css'

export default function Header() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function loadTranslations() {
      try {
        setIsLoading(true)
        const response = await import(`@/../../public/locales/${lng}/common.json`)
        setTranslations(response.default || {})
      } catch (error) {
        console.error('Error loading translations:', error)
        const fallbackTranslations = {
          menu: {
            news: lng === 'vi' ? 'TIN TỨC' : 'NEWS',
            videos: lng === 'vi' ? 'VIDEO THUYẾT TRÌNH' : 'VIDEOS',
            publications: lng === 'vi' ? 'HỢP TÁC XUẤT BẢN' : 'PUBLICATIONS',
            library: lng === 'vi' ? 'THƯ VIỆN' : 'LIBRARY',
          }
        }
        setTranslations(fallbackTranslations)
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

  const menuItems = [
    {
      title: 'menu.news',
      href: `/${lng}/news`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
      ),
      submenu: [
        { title: 'menu.news_items.cooperation_info', href: `/${lng}/news/cooperation` },
        { title: 'menu.news_items.training_programs', href: `/${lng}/news/training` },
        { title: 'menu.news_items.projects', href: `/${lng}/news/projects` },
        { title: 'menu.news_items.networks', href: `/${lng}/news/networks` }
      ]
    },
    {
      title: 'menu.videos',
      href: `/${lng}/videos`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'menu.publications',
      href: `/${lng}/publications`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      submenu: [
        { title: 'menu.publications_items.domestic', href: `/${lng}/publications/domestic` },
        { title: 'menu.publications_items.international', href: `/${lng}/publications/international` }
      ]
    },
    {
      title: 'menu.library',
      href: `/${lng}/library`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      submenu: [
        { title: 'menu.library_items.documents', href: `/${lng}/library/documents` },
        { title: 'menu.library_items.photos', href: `/${lng}/library/photos` }
      ]
    }
  ]

  const handleSubmenuClick = (index, e) => {
    e.preventDefault()
    setOpenSubmenu(openSubmenu === index ? null : index)
  }

  const closeAllSubmenus = () => {
    setOpenSubmenu(null)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.submenu-container')) {
        closeAllSubmenus()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href={`/${lng}`} 
            className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="text-lg sm:text-xl font-bold">SSHE2025</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item, index) => (
              <div key={index} className="relative submenu-container group">
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-full
                    transition-all duration-200 group
                    ${pathname.startsWith(item.href) 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <span className={`
                    ${pathname.startsWith(item.href) ? '' : 'group-hover:scale-110'}
                    transition-transform duration-200
                  `}>
                    {item.icon}
                  </span>
                  <span className="ml-2">{t(item.title)}</span>
                  {item.submenu && (
                    <svg 
                      className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Desktop Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 py-2 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      >
                        {t(subItem.title)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-200">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block lg:!hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isMobileMenuOpen 
                  ? "M6 18L18 6M6 6l12 12" 
                  : "M4 6h16M4 12h16M4 18h16"
                } 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-white/80 backdrop-blur-md
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen 
              ? 'opacity-100 visible translate-y-0' 
              : 'opacity-0 invisible -translate-y-10'}
          `}
        >
          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="bg-white shadow-xl p-4 space-y-4 m-4 rounded-2xl">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between w-full p-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${pathname.startsWith(item.href) 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{t(item.title)}</span>
                    </div>
                    {item.submenu && (
                      <svg 
                        className="w-4 h-4"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="mt-2 ml-8 space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-2 text-sm text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50"
                        >
                          {t(subItem.title)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 