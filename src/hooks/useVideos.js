import { useState, useEffect } from 'react'
import { getVideoList } from '../services/video.service'
import { usePathname } from 'next/navigation'

/**
 * Custom hook for fetching videos with pagination and filters
 * @param {Object} options
 * @param {number} options.page - Page number
 * @param {number} options.pageSize - Items per page
 * @param {string} options.year - Year filter
 * @param {string} options.school - School filter
 * @param {string} options.locale - Language (vi/en)
 */
export function useVideos({ 
  page = 1, 
  pageSize = 10, 
  year = '', 
  school = '',
  locale = 'vi'
} = {}) {
  const [videos, setVideos] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pathname = usePathname()
  const currentLocale = pathname?.split('/')[1] || locale

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await getVideoList({ 
          page, 
          pageSize, 
          year, 
          school,
          locale: currentLocale 
        })
        setVideos(response.data)
        setPagination(response.meta.pagination)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [page, pageSize, year, school, currentLocale])

  return { videos, pagination, loading, error }
} 