import { useEffect, useState } from 'react';

import { getApiCall } from '@/utils/api';

type SectorCountType = {
  country: string;
  sector: number | null;
  intensity: number | null;
  relevance: number | null;
}[];

const useFetchLowest = () => {
  const [data, setData] = useState<SectorCountType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiCall('country/lowest-sector');
        const formattedData = data.map((item: any[]) => ({
          country: item[0],
          sector: item[1],
          intensity: item[2],
          relevance: item[3],
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchLowest;
