'use client'

import { useEffect, useState } from 'react'
import VideoList from '@/components/VideoList'

export default function VideosPage({ params: { lng } }) {
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedSchool, setSelectedSchool] = useState('all')

  const years = [
    { id: 'all', name: 'videos.years.all' },
    { id: 'n2025', name: 'videos.years.2025' },
    { id: 'n2024', name: 'videos.years.2024' },
    { id: 'n2023', name: 'videos.years.2023' },
    { id: 'n2022', name: 'videos.years.2022' },
    { id: 'n2021', name: 'videos.years.2021' },
    { id: 'n2020', name: 'videos.years.2020' },
    { id: 'n2019', name: 'videos.years.2019' },
    { id: 'n2018', name: 'videos.years.2018' }
  ]

  const schools = [
    { id: 'all', name: 'videos.schools.all' },
    { id: 'dshphn', name: 'videos.schools.dshphn' },
    { id: 'dsp', name: 'videos.schools.dsp' }
  ]

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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('videos.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('videos.subtitle')}
          </p>
        </div>

        {/* Main Layout: Left content, Right sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Video Content */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            <VideoList 
              selectedYear={selectedYear} 
              selectedSchool={selectedSchool}
              t={t}
            />
          </div>

          {/* Right Sidebar - Filter Menus */}
          <div className="lg:col-span-1 space-y-6">
            {/* Menu 1: Year Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t('videos.filter.year')}
              </h3>
              <div className="space-y-2">
                {years.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                      selectedYear === year.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm'
                    }`}
                  >
                    {t(year.name)}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu 2: School Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {t('videos.filter.school')}
              </h3>
              <div className="space-y-2">
                {schools.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchool(school.id)}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                      selectedSchool === school.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-green-50 text-green-700 hover:bg-green-100 hover:shadow-sm'
                    }`}
                  >
                    {t(school.name)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 