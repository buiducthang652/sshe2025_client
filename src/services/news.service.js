import axiosInstance from './axios';

/**
 * Get news list with pagination and filters
 * @param {Object} params
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 * @param {string} params.search - Search term
 * @param {string} params.danhmuc - Category filter
 * @param {string} params.locale - Language (vi/en)
 * @returns {Promise<Object>}
 */
export const getNewsList = async ({
  page = 1,
  pageSize = 10,
  search = '',
  danhmuc = '',
  locale = 'vi',
}) => {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'filters[title][$containsi]': search,
    'sort': ['updatedAt:desc', 'ngay_dang:desc', 'publishedAt:desc'],
    'populate': '*'
  };

  if (danhmuc) {
    params['filters[danhmuc][$eq]'] = danhmuc;
  }

  try {
    const response = await axiosInstance.get('/news', { params });
    return {
      data: response?.data,
      meta: response?.meta
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

/**
 * Get news detail by ID
 * @param {number} id - News ID
 * @param {string} locale - Language (vi/en)
 * @returns {Promise<Object>}
 */
export const getNewsById = async (id, locale = 'vi') => {
  try {
    const response = await axiosInstance.get(`/news/${id}`, {
      params: { 
        'populate': '*'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    throw error;
  }
}; 