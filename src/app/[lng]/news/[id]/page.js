'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NewsDetail({ params }) {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const id = parseInt(params.id)

  // Giả lập dữ liệu bài viết chi tiết
  const article = {
    id: id,
    title: 'Hội nghị Khoa học Quốc tế SSHE2025',
    content: `
      <p>Trường Đại học Sư phạm Hà Nội trân trọng thông báo về việc tổ chức Hội nghị Khoa học Quốc tế về An toàn, An ninh và Giáo dục Y tế trong trường học năm 2025 (SSHE2025).</p>
      
      <h2>Mục tiêu hội nghị</h2>
      <p>Hội nghị nhằm tạo diễn đàn để các nhà khoa học, các nhà quản lý giáo dục, các nhà hoạch định chính sách và các chuyên gia trong lĩnh vực an toàn, an ninh và giáo dục y tế học đường chia sẻ kết quả nghiên cứu, kinh nghiệm thực tiễn.</p>
      
      <h2>Thời gian và địa điểm</h2>
      <p>- Thời gian: Tháng 5 năm 2025</p>
      <p>- Địa điểm: Trường Đại học Sư phạm Hà Nội</p>
      
      <h2>Các chủ đề chính</h2>
      <ul>
        <li>An toàn học đường</li>
        <li>An ninh học đường</li>
        <li>Giáo dục y tế học đường</li>
        <li>Sức khỏe tinh thần của học sinh</li>
        <li>Môi trường học tập an toàn</li>
      </ul>`,
    date: '2024-03-15',
    image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
    category: 'Thông báo',
    author: 'Ban tổ chức SSHE2025'
  }

  // Giả lập dữ liệu bài viết liên quan
  const relatedArticles = [
    {
      id: 2,
      title: 'Thông báo về việc nộp bài tham luận',
      excerpt: 'Hướng dẫn chi tiết về quy trình, thể lệ và thời hạn nộp bài tham luận cho Hội nghị SSHE2025.',
      date: '2024-03-10',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'Hướng dẫn'
    },
    {
      id: 3,
      title: 'Chương trình Hội nghị dự kiến',
      excerpt: 'Thông tin về chương trình dự kiến của Hội nghị, bao gồm các phiên họp, workshop và các hoạt động bên lề.',
      date: '2024-03-05',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'Chương trình'
    },
    {
      id: 4,
      title: 'Thông tin về địa điểm tổ chức',
      excerpt: 'Chi tiết về địa điểm tổ chức hội nghị và các thông tin hữu ích về đi lại, lưu trú.',
      date: '2024-03-01',
      image: 'https://sshe2025.hnue.edu.vn/v2/uploads/638835622634233856_395d92386f.webp',
      category: 'Thông tin'
    }
  ]

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <Link href={`/${lng}/news`} className="hover:text-blue-600">
                Tin tức
              </Link>
              <span>/</span>
              <span>{article.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('vi-VN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{article.author}</span>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
              {relatedArticles.map((item) => (
                <article 
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Link href={`/${lng}/news/${item.id}`}>
                    <div className="relative h-48 rounded-t-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-blue-600">
                          {item.category}
                        </span>
                        <span>•</span>
                        <time className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString('vi-VN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 