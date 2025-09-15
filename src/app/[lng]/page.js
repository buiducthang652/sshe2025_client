'use client'

import HomeHero from '@/components/HomeHero'
import HomeNewsList from '@/components/HomeNewsList'
import PublicationCategories from '@/components/PublicationCategories'
import HomeAbout from '@/components/HomeAbout'
import { usePathname } from 'next/navigation'
import { usePartners } from '@/hooks/usePartners'
import { buildImageUrl } from '@/config/constants'
import HomeVideo from '@/components/HomeVideo'

export default function Home() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const { partners, loading: partnersLoading, error: partnersError } = usePartners()

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HomeHero locale={lng} />
      
      {/* Conference Info Section */}
      <section className="py-12 relative overflow-hidden bg-gradient-to-br">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {lng === 'vi' ? 'Thông tin Hội thảo' : 'Conference Information'}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600 font-medium">
                  {lng === 'vi' ? 'Bài báo cáo' : 'Presentations'}
                </div>
              </div>
            </div>
            
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-gray-600 font-medium">
                  {lng === 'vi' ? 'Tiểu ban Chuyên đề' : 'Specialized Sessions'}
                </div>
              </div>
            </div>
            
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
                <div className="text-sm text-gray-600 font-medium">
                  {lng === 'vi' ? 'Diễn giả' : 'Speakers'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <HomeAbout />

      {/* News Section */}
      <HomeNewsList locale={lng} />

      <HomeVideo />
      
      {/* Publications Section */}
      <PublicationCategories locale={lng} />

      {/* International Partners Section */}
      {/* <div className="mt-20 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl">
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
    </main>
  )
}