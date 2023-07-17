import { useEffect, useState } from 'react';

import { getApiCall } from '@/utils/api';

type TopicIntensityType = {
  intensity: number | null;
  topic: string;
}[];

const useFetchTopicIntensity = () => {
  const [data, setData] = useState<TopicIntensityType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String>('');

  useEffect(() => {
    const fetchData = () => {
      getApiCall('topic-intensity') // replace 'topic-intensity' with the appropriate endpoint
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

export default useFetchTopicIntensity;
