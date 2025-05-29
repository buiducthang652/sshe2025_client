import axiosInstance from './axios';

/**
 * Get news list with pagination and filters
 * @param {Object} params
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 * @param {string} params.locale - Language locale
 * @param {string} params.search - Search term
 * @returns {Promise<Object>}
 */
export const getNewsList = async ({
  page = 1,
  pageSize = 10,
  locale = 'vi',
  search = '',
}) => {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    locale,
    'filters[title][$containsi]': search,
    'sort': 'publishedAt:desc',
    'populate': '*'
  };

  try {
    const response = await axiosInstance.get('/news', { params });
    return {
      data: response.data,
      meta: response.meta
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

/**
 * Get news detail by ID
 * @param {number} id - News ID
 * @param {string} locale - Language locale
 * @returns {Promise<Object>}
 */
export const getNewsById = async (id, locale = 'vi') => {
  try {
    const response = await axiosInstance.get(`/news/${id}`, {
      params: { 
        locale,
        'populate': '*'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    throw error;
  }
}; 