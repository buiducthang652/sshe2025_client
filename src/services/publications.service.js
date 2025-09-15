import axiosInstance from './axios';

/**
 * Get publications list with pagination and filters
 * @param {Object} params
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 * @param {string} params.search - Search term
 * @param {string} params.categories - Category filter
 * @param {string} params.locale - Language (vi/en)
 * @returns {Promise<Object>}
 */
export const getPublicationsList = async ({
  page = 1,
  pageSize = 10,
  search = '',
  categories = '',
  locale = 'vi',
}) => {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'filters[title][$containsi]': search,
    'sort': ['updatedAt:desc', 'ngay_dang:desc', 'publishedAt:desc'],
    'populate': '*'
  };

  if (categories) {
    params['filters[categories][$eq]'] = categories;
  }

  try {
    const response = await axiosInstance.get('/publishing-cooperation', { params });
    return {
      data: response?.data,
      meta: response?.meta
    };
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
}; 