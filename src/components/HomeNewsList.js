'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function HomeNewsList() {
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

  const newsItems = [
    {
      id: 1,
      title: 'Hội nghị Khoa học Quốc tế SSHE2025',
      excerpt: 'Thông báo về việc tổ chức Hội nghị Khoa học Quốc tế về An toàn, An ninh và Giáo dục Y tế trong trường học năm 2025 (SSHE2025).',
      date: '2024-03-15',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'news'
    },
    {
      id: 2,
      title: 'Hợp tác với Đại học Quốc gia Singapore',
      excerpt: 'Ký kết thỏa thuận hợp tác nghiên cứu và trao đổi học thuật với Đại học Quốc gia Singapore trong lĩnh vực an toàn học đường.',
      date: '2024-03-10',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'cooperation'
    },
    {
      id: 3,
      title: 'Dự án nghiên cứu An toàn học đường',
      excerpt: 'Khởi động dự án nghiên cứu về các giải pháp nâng cao an toàn học đường tại Việt Nam với sự tham gia của các chuyên gia quốc tế.',
      date: '2024-03-05',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'projects'
    },
    {
      id: 4,
      title: 'Mạng lưới các trường đại học Đông Nam Á',
      excerpt: 'Thành lập mạng lưới hợp tác giữa các trường đại học Đông Nam Á về nghiên cứu an toàn và sức khỏe học đường.',
      date: '2024-03-01',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'networks'
    },
    // Row 2
    {
      id: 5,
      title: 'Hướng dẫn đăng ký tham dự',
      excerpt: 'Thông tin chi tiết về cách thức đăng ký, phí tham dự và các quyền lợi khi tham gia hội nghị.',
      date: '2024-02-28',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 6,
      title: 'Diễn giả và chuyên gia',
      excerpt: 'Giới thiệu về các diễn giả và chuyên gia sẽ tham gia trình bày tại hội nghị.',
      date: '2024-02-25',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 7,
      title: 'Workshop chuyên đề',
      excerpt: 'Thông tin về các workshop chuyên đề sẽ được tổ chức trong khuôn khổ hội nghị.',
      date: '2024-02-20',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 8,
      title: 'Đối tác và nhà tài trợ',
      excerpt: 'Danh sách các đối tác và nhà tài trợ đồng hành cùng hội nghị SSHE2025.',
      date: '2024-02-15',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'news'
    },
    // Row 3
    {
      id: 9,
      title: 'Hướng dẫn chuẩn bị poster',
      excerpt: 'Yêu cầu và hướng dẫn chi tiết về việc chuẩn bị poster cho phiên poster của hội nghị.',
      date: '2024-02-10',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 10,
      title: 'Chương trình tham quan',
      excerpt: 'Thông tin về các hoạt động tham quan và giao lưu văn hóa dành cho đại biểu quốc tế.',
      date: '2024-02-05',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 11,
      title: 'Thông tin lưu trú',
      excerpt: 'Danh sách các khách sạn được đề xuất và thông tin đặt phòng cho đại biểu.',
      date: '2024-02-01',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 12,
      title: 'Deadline quan trọng',
      excerpt: 'Tổng hợp các mốc thời gian quan trọng cần lưu ý khi tham gia hội nghị.',
      date: '2024-01-28',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'news'
    },
    // Row 4
    {
      id: 13,
      title: 'Hướng dẫn trình bày',
      excerpt: 'Quy định và hướng dẫn về thời gian, format trình bày tại hội nghị.',
      date: '2024-01-25',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 14,
      title: 'Hoạt động bên lề',
      excerpt: 'Các hoạt động networking và giao lưu được tổ chức bên lề hội nghị.',
      date: '2024-01-20',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 15,
      title: 'Phương tiện di chuyển',
      excerpt: 'Hướng dẫn về cách di chuyển từ sân bay và các phương tiện công cộng.',
      date: '2024-01-15',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'training'
    },
    {
      id: 16,
      title: 'Kỷ yếu hội nghị',
      excerpt: 'Thông tin về việc xuất bản kỷ yếu và các bài báo được chọn.',
      date: '2024-01-10',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'news'
    }
  ]

  const categoryTitles = {
    news: t('news.categories.news'),
    cooperation: t('news.categories.cooperation'),
    projects: t('news.categories.projects'),
    networks: t('news.categories.networks'),
    training: t('news.categories.training')
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('news.latest')}</h2>
          <Link 
            href={`/${lng}/news`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('news.view_all')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {newsItems.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/${lng}/news/${item.id}`}>
                <div className="relative h-40 rounded-t-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={item.id <= 4}
                    className="object-cover"
                    loading={item.id <= 4 ? "eager" : "lazy"}
                    quality={75}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                      {categoryTitles[item.category]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.excerpt}
                  </p>
                  <time className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Mobile View More Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${lng}/news`}
            className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Xem tất cả tin tức
          </Link>
        </div>
      </div>
    </section>
  )
} 