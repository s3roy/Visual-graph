import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

import CountryRelevance from './CountryRelevance';
import IntensityBarChart from './IntensityBarChart';
import Sector from './SectorDonutChart/Sector';

interface DataPoint {
  topic: string;
  intensity: number;
}
interface ChartProps {
  cityList: string[];
}
const Charts: React.FC<ChartProps> = ({ cityList }) => {
  // Example data
  const [chartDataTntensityVsTopic, setChartData] = useState<DataPoint[]>([
    { topic: 'Topic 1', intensity: 10 },
    { topic: 'Topic 2', intensity: 5 },
    { topic: 'Topic 3', intensity: 8 },
    { topic: 'Topic 4', intensity: 10 },
    { topic: 'Topic 5', intensity: 5 },
    { topic: 'Topic 6', intensity: 8 },
    { topic: 'Topic 7', intensity: 10 },
    { topic: 'Topic 8', intensity: 5 },
    { topic: 'Topic 9', intensity: 8 },
    { topic: 'Topic 10', intensity: 10 },
    { topic: 'Topic 12', intensity: 5 },
    { topic: 'Topic 13', intensity: 8 },
    { topic: 'Topic 11', intensity: 10 },
    { topic: 'Topic 22', intensity: 5 },
    { topic: 'Topic 33', intensity: 8 },
    { topic: 'Topic 31', intensity: 10 },
    { topic: 'Topic 32', intensity: 5 },
    { topic: 'Topic 43', intensity: 8 },
    // Add more data points as needed
  ]);

  return (
    <>
      {/* <Box ml="10" mt="16">
        <IntensityBarChart data={chartDataTntensityVsTopic} />
      </Box> */}

      <Flex mb="10" width="88vw" mr="1">
        <Sector cityList={cityList} />
        <CountryRelevance />
      </Flex>
    </>
  );
};

export default Charts;
