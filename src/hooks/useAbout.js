import { useState, useEffect } from 'react'
import axiosInstance from '@/services/axios'

export function useAbout({ locale, isHomePage = false }) {
  const [content, setContent] = useState('')
  const [content_en, setContentEn] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          populate: '*'
        })
        
        // Use different endpoints based on the page
        const endpoint = isHomePage 
          ? '/abouts/ticcwjt8tvb71f6fbnpmru4l'
          : '/abouts/jzaeid62a9ckjwk8xqpr49nq'
        
        const { data } = await axiosInstance.get(`${endpoint}?${params.toString()}`)

        // Get the content from the API response
        setContent(data.content)
        setContentEn(data.contents_en)
      } catch (err) {
        console.error('Error fetching content:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [locale, isHomePage])

  return { content, content_en, loading, error }
} 