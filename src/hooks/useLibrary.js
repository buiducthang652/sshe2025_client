import { useState, useEffect } from 'react';
import { getLibraryList } from '@/services/library.service';
import { usePathname } from 'next/navigation';

export function useLibrary({ page = 1, pageSize = 12, category = '', filters = {} }) {
  const [documents, setDocuments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'vi';

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'sort': ['updatedAt:desc', 'ngay_dang:desc', 'publishedAt:desc'],
          'populate': '*'
        };

        if (category) {
          if (category === 'photos' || category === 'album') {
            params['filters[danhmuc][$eq]'] = 'album';
          } else if (category === 'documents') {
            params['filters[danhmuc][$eq]'] = 'tailieu';
          }
        }

        // Add additional filters if provided
        if (filters.category_album) {
          params['filters[category_album][$eq]'] = filters.category_album;
        }

        const response = await getLibraryList(params);
        
        if (response?.data) {
          setDocuments(response.data);
          setPagination(response.meta.pagination);
        } else {
          setDocuments([]);
          setPagination(null);
        }
      } catch (err) {
        setError(err.message);
        setDocuments([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [page, pageSize, category, locale, filters.category_album]);

  return { documents, pagination, loading, error };
} 