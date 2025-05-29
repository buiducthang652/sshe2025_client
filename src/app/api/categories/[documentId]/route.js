import { NextResponse } from 'next/server'
import axiosInstance from '@/services/axios'

export async function GET(request, { params }) {
  const { documentId } = params
  
  try {
    const data = await axiosInstance.get(`/categories/${documentId}?populate[tin_tucs][populate]=thumbnail`)
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('API Proxy Error:', error)
    
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