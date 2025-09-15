import { useState, useEffect } from 'react';
import { getPublicationsList } from '../services/publications.service';
import { usePathname } from 'next/navigation';

/**
 * Custom hook for fetching publications with pagination
 * @param {Object} options
 * @param {number} options.page - Page number
 * @param {number} options.pageSize - Items per page
 * @param {string} options.search - Search term
 * @param {string} options.categories - Category filter
 * @param {string} options.locale - Language (vi/en)
 */
export const usePublications = ({
  page = 1,
  pageSize = 10,
  search = '',
  categories = '',
  locale = 'vi',
}) => {
  const [publications, setPublications] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || locale;

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPublicationsList({ 
          page, 
          pageSize, 
          search, 
          categories,
          locale: currentLocale 
        });
        setPublications(response.data);
        setPagination(response.meta.pagination);
      } catch (err) {
        setError(err.message || 'Error fetching publications');
        setPublications([]);
        setPagination({
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [page, pageSize, search, categories, currentLocale]);

  return {
    publications,
    pagination,
    loading,
    error,
  };
}; 