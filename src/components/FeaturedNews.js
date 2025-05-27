'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function FeaturedNews() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]

  const featuredNews = {
    main: {
      id: 1,
      title: 'Hội nghị Khoa học Quốc tế SSHE2025',
      excerpt: 'Thông báo về việc tổ chức Hội nghị Khoa học Quốc tế về An toàn, An ninh và Giáo dục Y tế trong trường học 2025',
      date: '2024-03-15',
      image: '/images/news/conference.jpg',
      category: 'Thông báo'
    },
    secondary: [
      {
        id: 2,
        title: 'Thông báo về việc nộp bài tham luận',
        excerpt: 'Hướng dẫn chi tiết về quy trình, thể lệ và thời hạn nộp bài tham luận',
        date: '2024-03-10',
        image: '/images/news/papers.jpg',
        category: 'Hướng dẫn'
      },
      {
        id: 3,
        title: 'Chương trình Hội nghị dự kiến',
        excerpt: 'Thông tin về chương trình dự kiến của Hội nghị',
        date: '2024-03-05',
        image: '/images/news/schedule.jpg',
        category: 'Chương trình'
      }
    ]
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Tin tức nổi bật</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Featured News */}
          <div className="relative h-[500px] group">
            <Link href={`/${lng}/news/${featuredNews.main.id}`}>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300 z-10" />
              <Image
                src={featuredNews.main.image}
                alt={featuredNews.main.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-3">
                  {featuredNews.main.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {featuredNews.main.title}
                </h3>
                <p className="text-gray-200 mb-4 line-clamp-2">
                  {featuredNews.main.excerpt}
                </p>
                <time className="text-gray-300 text-sm">
                  {new Date(featuredNews.main.date).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </Link>
          </div>

          {/* Secondary News */}
          <div className="grid grid-cols-1 gap-8">
            {featuredNews.secondary.map((news) => (
              <div key={news.id} className="relative h-[235px] group">
                <Link href={`/${lng}/news/${news.id}`}>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 z-10" />
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-2">
                      {news.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {news.title}
                    </h3>
                    <time className="text-gray-300 text-sm">
                      {new Date(news.date).toLocaleDateString('vi-VN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 