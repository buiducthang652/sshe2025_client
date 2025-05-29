import { NextResponse } from 'next/server'
import axiosInstance from '@/services/axios'

export async function GET(request, { params }) {
  const { documentId } = params
  const { searchParams } = new URL(request.url)
  
  // Get query parameters
  const locale = searchParams.get('locale') || 'vi'
  const populate = searchParams.get('populate') || '*'
  const fields = searchParams.get('fields') || 'title,description,contents'
  
  try {
    // Build API URL with parameters
    const apiParams = new URLSearchParams({
      locale,
      populate,
      fields
    })
    
    const apiUrl = `/tin-tucs/${documentId}?${apiParams.toString()}`
    const data = await axiosInstance.get(apiUrl)
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('News Detail API Proxy Error:', error)
    
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