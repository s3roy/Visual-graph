import { Flex } from '@chakra-ui/react';
import React from 'react';

import Cities from '../cities/Cities';
import Tracker from '../expense/Tracker';
import CountryBased from './CountryBased';

interface SectorAnalyticsProps {
  cityList: string[];
}
const SectorAnalytics: React.FC<SectorAnalyticsProps> = ({ cityList }) => {
  return (
    <Flex width="82vw">
      <CountryBased />
      <Tracker />
      <Cities cityList={cityList} />
    </Flex>
  );
};

export default SectorAnalytics;
