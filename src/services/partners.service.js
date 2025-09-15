import axiosInstance from './axios';

/**
 * Get list of international partners
 * @param {string} locale - Language (vi/en)
 * @returns {Promise<Array>}
 */
export const getInternationalPartners = async (locale = 'vi') => {
  try {
    const response = await axiosInstance.get('/international-partners', {
      params: {
        'populate': '*',
        'sort': 'createdAt:desc',
        'locale': locale
      }
    });
    return response?.data || [];
  } catch (error) {
    console.error('Error fetching international partners:', error);
    throw error;
  }
}; 