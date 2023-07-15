import { useEffect, useState } from 'react';

import { getApiCall } from '@/utils/api';

const useFetchSector = (sortBy: string = '', filterValue: string = '') => {
  const [sectors, setSectors] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {};

        if (sortBy !== '') {
          params = { ...params, sortBy };
        }

        if (filterValue !== '') {
          params = { ...params, filterValue };
        }

        const response = await getApiCall('sectors/count', params);
        setSectors(response);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, filterValue]);

  return { sectors, loading };
};

export default useFetchSector;
