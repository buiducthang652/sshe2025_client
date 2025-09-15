import { useState, useEffect } from 'react';
import { getInternationalPartners } from '@/services/partners.service';

export const usePartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true);
        setError(null);
        const data = await getInternationalPartners();
        setPartners(data);
      } catch (err) {
        console.error('Error in usePartners:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  return { partners, loading, error };
}; 