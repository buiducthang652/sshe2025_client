import { useState, useEffect } from 'react';
import { getNewsList } from '../services/news.service';
import { usePathname } from 'next/navigation';

/**
 * Custom hook for fetching news with pagination
 * @param {Object} options
 * @param {number} options.page - Page number
 * @param {number} options.pageSize - Items per page
 * @param {string} options.search - Search term
 * @param {string} options.danhmuc - Category filter
 * @param {string} options.locale - Language (vi/en)
 */
export const useNews = ({
  page = 1,
  pageSize = 10,
  search = '',
  danhmuc = '',
  locale = 'vi',
}) => {
  const [news, setNews] = useState([]);
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
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getNewsList({ 
          page, 
          pageSize, 
          search, 
          danhmuc,
          locale: currentLocale 
        });
        setNews(response.data);
        setPagination(response.meta.pagination);
      } catch (err) {
        setError(err.message || 'Error fetching news');
        setNews([]);
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

    fetchNews();
  }, [page, pageSize, search, danhmuc, currentLocale]);

  return {
    news,
    pagination,
    loading,
    error,
  };
}; 