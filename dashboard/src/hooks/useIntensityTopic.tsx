import { useEffect, useState } from 'react';

import { getApiCall } from '@/utils/api';

type TopicIntensityType = {
  intensity: number | null;
  topic: string;
}[];

const useFetchTopicIntensity = (sortBy: string, filterValues: string) => {
  const [data, setData] = useState<TopicIntensityType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String>('');

  useEffect(() => {
    const fetchData = () => {
      let endpoint = 'topic-intensity'; // replace 'topic-intensity' with the appropriate endpoint

      if (sortBy === 'start year') {
        endpoint += `?startYear=${filterValues}`;
      } else if (sortBy === 'end year') {
        endpoint += `?endYear=${filterValues}`;
      }

      getApiCall(endpoint)
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
  }, [sortBy, filterValues]);

  return { data, loading, error };
};

export default useFetchTopicIntensity;
