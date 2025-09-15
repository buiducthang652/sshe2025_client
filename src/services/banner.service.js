import axiosInstance from './axios';

/**
 * Get banner list
 * @param {string} locale - Language (vi/en)
 * @returns {Promise<Object>}
 */
export const getBanners = async (locale = 'vi') => {
  try {
    const response = await axiosInstance.get('/banners', {
      params: {
        'populate': '*',
        'sort': 'publishedAt:desc',
        'locale': locale
      },
    });
    return {
      data: response.data,
      meta: response.meta
    };
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
}; 