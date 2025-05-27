'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import NewsList from '@/components/NewsList'
import Link from 'next/link'

export default function NewsCategory({ params }) {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]
  const category = params.category
  const [activeFilter, setActiveFilter] = useState('all')

  // Categories for the submenu
  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'announcement', name: 'Thông báo' },
    { id: 'guide', name: 'Hướng dẫn' },
    { id: 'program', name: 'Chương trình' },
    { id: 'media', name: 'Truyền thông' }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center overflow-x-auto py-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-8">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${lng}/news/category/${cat.id}`}
                  className={`
                    whitespace-nowrap text-sm font-medium px-1 py-2 border-b-2 transition-colors duration-200
                    ${activeFilter === cat.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'}
                  `}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={`/${lng}`} className="hover:text-gray-700">
                Trang chủ
              </Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
              </svg>
            </li>
            <li className="flex items-center">
              <Link href={`/${lng}/news`} className="hover:text-gray-700">
                Tin tức
              </Link>
              <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
              </svg>
            </li>
            <li>
              <span className="text-gray-700" aria-current="page">
                {categories.find(cat => cat.id === category)?.name || 'Tất cả'}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* News List */}
      <div className="container mx-auto px-4 py-8">
        <NewsList />
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 py-12">
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            <button
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
              </svg>
              Trang trước
            </button>
          </div>
          <div className="hidden md:-mt-px md:flex">
            <button className="inline-flex items-center border-t-2 border-blue-600 px-4 pt-4 text-sm font-medium text-blue-600">1</button>
            <button className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">2</button>
            <button className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">3</button>
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
            <button className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">8</button>
            <button className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">9</button>
            <button className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">10</button>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Trang sau
              <svg className="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
} 