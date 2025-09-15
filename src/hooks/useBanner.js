import { useState, useEffect } from 'react';
import { getBanners } from '../services/banner.service';

export const useBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getBanners();
        setBanners(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching banners');
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return {
    banners,
    loading,
    error,
  };
}; 