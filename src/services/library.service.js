import axiosInstance from './axios';

/**
 * Get library documents list with pagination and filters
 * @param {Object} params - Query parameters for the API
 * @returns {Promise<Object>}
 */
export const getLibraryList = async (params) => {
  try {
    const response = await axiosInstance.get('/library', { 
      params: {
        ...params
      }
    });
    return response || { data: [], meta: { pagination: {} } };
  } catch (error) {
    console.error('Error fetching library documents:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch library documents');
  }
}; 