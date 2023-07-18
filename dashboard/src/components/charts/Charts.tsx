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
  countryList: string[];
  startYearList: number[];
  endYearList: number[];
}

const Charts: React.FC<ChartProps> = ({
  cityList,
  countryList,
  startYearList,
  endYearList,
}) => {
  return (
    <>
      <Flex mb="2" width="82vw" mr="1">
        <Sector
          cityList={cityList}
          countryList={countryList}
          startYearList={startYearList}
          endYearList={endYearList}
        />
        <CountryRelevance />
      </Flex>
      <IntensityBarChart
        startYearList={startYearList}
        endYearList={endYearList}
      />
    </>
  );
};

export default Charts;
