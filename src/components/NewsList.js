'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NewsList({ category = null }) {
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
    {
      id: 5,
      title: 'Hợp tác quốc tế trong nghiên cứu',
      excerpt: 'Mở rộng quan hệ hợp tác nghiên cứu với các đối tác từ Nhật Bản và Hàn Quốc trong lĩnh vực giáo dục sức khỏe.',
      date: '2024-02-28',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'cooperation'
    },
    {
      id: 6,
      title: 'Dự án phát triển tài liệu đào tạo',
      excerpt: 'Triển khai dự án xây dựng bộ tài liệu đào tạo về an toàn học đường theo tiêu chuẩn quốc tế.',
      date: '2024-02-25',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'projects'
    },
    {
      id: 7,
      title: 'Mở rộng mạng lưới đối tác châu Âu',
      excerpt: 'Thiết lập quan hệ hợp tác mới với các tổ chức nghiên cứu và trường đại học tại châu Âu.',
      date: '2024-02-20',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'networks'
    },
    {
      id: 8,
      title: 'Thông báo về hội thảo trực tuyến',
      excerpt: 'Tổ chức chuỗi hội thảo trực tuyến về các chủ đề an toàn và sức khỏe học đường với sự tham gia của chuyên gia quốc tế.',
      date: '2024-02-15',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'news'
    }
  ]

  const filteredNews = category 
    ? newsItems.filter(item => item.category === category)
    : newsItems

  const categoryTitles = {
    news: t('news.categories.news'),
    cooperation: t('news.categories.cooperation'),
    projects: t('news.categories.projects'),
    networks: t('news.categories.networks')
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category ? categoryTitles[category] : t('news.latest')}
          </h1>
          <div className="flex gap-4 flex-wrap">
            <Link 
              href={`/${lng}/news`}
              className={`px-4 py-2 rounded-full ${!category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition-colors`}
            >
              {t('news.all')}
            </Link>
            {Object.entries(categoryTitles).map(([key, value]) => (
              <Link
                key={key}
                href={key === 'news' ? `/${lng}/news` : `/${lng}/news/${key}`}
                className={`px-4 py-2 rounded-full ${category === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition-colors`}
              >
                {value}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          {filteredNews.map((item) => (
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
      </div>
    </section>
  )
} 