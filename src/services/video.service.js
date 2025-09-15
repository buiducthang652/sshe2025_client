import axiosInstance from './axios';

/**
 * Get video list with pagination and filters
 * @param {Object} params
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 * @param {string} params.year - Year filter
 * @param {string} params.school - School filter
 * @param {string} params.locale - Language (vi/en)
 * @returns {Promise<Object>}
 */
export const getVideoList = async ({
  page = 1,
  pageSize = 10,
  year = '',
  school = '',
  locale = 'vi',
}) => {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'sort': ['updatedAt:desc', 'ngay_dang:desc', 'publishedAt:desc'],
    'populate': '*'
  };

  if (year) {
    params['filters[year][$eq]'] = year;
  }

  if (school) {
    params['filters[school][$eq]'] = school;
  }

  try {
    const response = await axiosInstance.get('/videos', { params });
    return {
      data: response?.data,
      meta: response?.meta
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

/**
 * Get video detail by ID
 * @param {string} id - Video document ID
 * @param {string} locale - Language (vi/en)
 * @returns {Promise<Object>}
 */
export const getVideoById = async (id, locale = 'vi') => {
  try {
    const response = await axiosInstance.get(`/videos/${id}`, {
      params: { 
        'populate': '*'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching video detail:', error);
    throw error;
  }
}; 