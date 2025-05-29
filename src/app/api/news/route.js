import { NextResponse } from 'next/server'
import axiosInstance from '@/services/axios'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  
  // Get query parameters
  const locale = searchParams.get('locale') || 'vi'
  const page = searchParams.get('page') || '1'
  const pageSize = searchParams.get('pageSize') || '10'
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'publishedAt:desc'
  const populate = searchParams.get('populate') || '*'
  const fields = searchParams.get('fields') || ''
  
  try {
    // Build API URL with parameters
    const params = new URLSearchParams({
      locale,
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'filters[title][$containsi]': search,
      sort,
      'populate': populate
    })
    
    // Add fields if specified
    if (fields) {
      params.append('fields', fields)
    }
    
    const apiUrl = `/tin-tucs?${params.toString()}`
    const data = await axiosInstance.get(apiUrl)
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('News List API Proxy Error:', error)
    
    const status = error.response?.status || 500
    const message = error.response?.data?.error?.message || error.message || 'Internal server error'
    
    return NextResponse.json(
      { error: message },
      { status }
    )
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 