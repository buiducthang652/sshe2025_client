import { useState, useEffect } from 'react';
import { getNewsList } from '../services/news.service';

/**
 * Custom hook for fetching news with pagination
 * @param {Object} options
 * @param {number} options.page - Page number
 * @param {number} options.pageSize - Items per page
 * @param {string} options.locale - Language locale
 * @param {string} options.search - Search term
 */
export const useNews = ({
  page = 1,
  pageSize = 10,
  locale = 'vi',
  search = '',
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getNewsList({ page, pageSize, locale, search });
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
  }, [page, pageSize, locale, search]);

  return {
    news,
    pagination,
    loading,
    error,
  };
}; 