'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function HomeVideo() {
  const pathname = usePathname()
  const lng = pathname.split('/')[1]

  return (
    <section className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              {lng === 'vi' ? 'Video Giới thiệu' : 'Introduction Video'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
          </div> */}

          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            {/* 16:9 aspect ratio wrapper */}
            <div className="relative pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/lnUFu5t1m7E"
                title="SSHE2025 Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}