import { useEffect, useState } from 'react';

import { getApiCall } from '@/utils/api';

type CountryRelevanceType = {
  relevance_count: number;
  country: string;
}[];

const useFetchCountryRelevance = () => {
  const [data, setData] = useState<CountryRelevanceType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String>('');

  useEffect(() => {
    const fetchData = () => {
      getApiCall('country-relevance')
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchCountryRelevance;
