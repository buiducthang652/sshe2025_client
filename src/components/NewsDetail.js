'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NewsDetail({ id }) {
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

  // Mock data - in real app, this would come from an API
  const newsItem = {
    id: parseInt(id),
    title: 'Hội nghị Khoa học Quốc tế SSHE2025',
    excerpt: 'Thông báo về việc tổ chức Hội nghị Khoa học Quốc tế về An toàn, An ninh và Giáo dục Y tế trong trường học năm 2025 (SSHE2025).',
    content: `
      <p>Trường Đại học Sư phạm Hà Nội trân trọng thông báo về việc tổ chức Hội nghị Khoa học Quốc tế về An toàn, An ninh và Giáo dục Y tế trong trường học năm 2025 (SSHE2025).</p>
      
      <h3>Thời gian và địa điểm</h3>
      <p>Hội nghị dự kiến được tổ chức vào tháng 7 năm 2025 tại Trường Đại học Sư phạm Hà Nội.</p>
      
      <h3>Mục tiêu</h3>
      <p>Hội nghị nhằm tạo diễn đàn để các nhà khoa học, các nhà quản lý giáo dục, các nhà hoạch định chính sách và các chuyên gia trong lĩnh vực an toàn học đường trao đổi, chia sẻ kinh nghiệm và kết quả nghiên cứu về các vấn đề liên quan đến an toàn, an ninh và giáo dục y tế trong trường học.</p>
      
      <h3>Các chủ đề chính</h3>
      <ul>
        <li>An toàn học đường trong bối cảnh hiện đại</li>
        <li>Giáo dục y tế và sức khỏe học đường</li>
        <li>An ninh mạng trong môi trường giáo dục</li>
        <li>Phòng chống bạo lực học đường</li>
        <li>Tâm lý học đường và sức khỏe tinh thần</li>
      </ul>
      
      <h3>Đối tượng tham dự</h3>
      <p>Hội nghị chào đón sự tham gia của:</p>
      <ul>
        <li>Các nhà khoa học, nghiên cứu viên</li>
        <li>Các nhà quản lý giáo dục</li>
        <li>Giảng viên, giáo viên các cấp</li>
        <li>Các chuyên gia trong lĩnh vực an toàn học đường</li>
        <li>Các tổ chức, cá nhân quan tâm</li>
      </ul>
    `,
    date: '2024-03-15',
    image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
    category: 'news',
    author: 'Ban tổ chức SSHE2025'
  }

  const categoryTitles = {
    news: t('news.categories.news'),
    cooperation: t('news.categories.cooperation'),
    projects: t('news.categories.projects'),
    networks: t('news.categories.networks'),
    training: t('news.categories.training')
  }

  const relatedNews = [
    {
      documentId: 2,
      title: 'Hợp tác với Đại học Quốc gia Singapore',
      excerpt: 'Ký kết thỏa thuận hợp tác nghiên cứu và trao đổi học thuật với Đại học Quốc gia Singapore trong lĩnh vực an toàn học đường.',
      date: '2024-03-10',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'cooperation'
    },
    {
      documentId: 3,
      title: 'Dự án nghiên cứu An toàn học đường',
      excerpt: 'Khởi động dự án nghiên cứu về các giải pháp nâng cao an toàn học đường tại Việt Nam với sự tham gia của các chuyên gia quốc tế.',
      date: '2024-03-05',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'projects'
    },
    {
      documentId: 4,
      title: 'Mạng lưới các trường đại học Đông Nam Á',
      excerpt: 'Thành lập mạng lưới hợp tác giữa các trường đại học Đông Nam Á về nghiên cứu an toàn và sức khỏe học đường.',
      date: '2024-03-01',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'networks'
    }
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <article className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <Link href={`/${lng}/news`} className="hover:text-blue-600">
                {t('news.latest')}
              </Link>
              <span>/</span>
              <span>{categoryTitles[newsItem.category]}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {newsItem.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time dateTime={newsItem.date}>
                {new Date(newsItem.date).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{newsItem.author}</span>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />

          {/* Related News */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('news.related')}</h2>
            <div className="grid grid-cols-1 gap-8 min-[40rem]:grid-cols-2 min-[48rem]:grid-cols-3 min-[64rem]:grid-cols-4">
              {relatedNews.map((item) => (
                <article 
                  key={item.documentId}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Link href={`/${lng}/news/${item.documentId}`}>
                    <div className="relative h-48 rounded-t-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
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
                      <p className="text-gray-600 mb-4 line-clamp-2">
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

          {/* Back to News */}
          <div className="mt-8 pt-8 border-t">
            <Link
              href={`/${lng}/news`}
              className="text-blue-600 hover:text-blue-700"
            >
              ← {t('news.view_all')}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
} 