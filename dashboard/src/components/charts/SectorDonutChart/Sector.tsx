import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import Tracker from '@/components/expense/Tracker';
import Filter from '@/components/Filters/Filter';
import useFetchSector from '@/hooks/useFetchSector';
import { FILTER_LIST } from '@/utils/constants';

import drawChart from './drawChart';

interface SectorProps {
  cityList: string[];
  countryList: string[];
  startYearList: number[];
  endYearList: number[];
}

const Sector: React.FC<SectorProps> = ({
  cityList,
  countryList,
  startYearList,
  endYearList,
}) => {
  const [sortBy, setSortBy] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const { sectors, loading } = useFetchSector(sortBy, filterValue);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const sectorContainerRef = useRef<HTMLDivElement | null>(null);

  const sectorsArray = sectors.map(
    ({ sector, sector_count }: { sector: string; sector_count: number }) => ({
      sector,
      count: sector_count,
    })
  );

  useEffect(() => {
    const cleanup = drawChart(
      svgRef,
      sectorContainerRef,
      sectorsArray,
      loading
    );
    return cleanup;
  }, [loading, sectorsArray]);

  return (
    <>
      <Box
        id="tooltip"
        position="absolute"
        visibility="hidden"
        backgroundColor="white"
        borderRadius="5px"
        padding="10px"
        color="blackAlpha.900"
        zIndex={999}
      />
      <Flex
        width="75%"
        height="lg"
        border="2px"
        borderRadius="lg"
        ml="12"
        mt="2"
        position="relative"
        justifyContent="space-between"
        borderColor="gray.400"
      >
        <Box width="full" ml="10">
          <Text
            mt="8"
            fontWeight="extrabold"
            fontSize="4xl"
            fontFamily="cursive"
            color="GrayText"
          >
            Sector Chart
          </Text>
          <Text mt="2" ml="10" fontFamily="cursive" color="GrayText">
            Overview
          </Text>

          <Box mt="10">
            <Filter
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              sortOptions={FILTER_LIST}
              filterValues={{
                city: cityList,
                country: countryList,
                startYear: startYearList.map(String),
                endYear: endYearList.map(String),
              }}
            />
          </Box>
        </Box>

        <svg
          ref={svgRef}
          style={{ width: '100%', height: '100%', marginRight: '4rem' }}
        ></svg>

        <div
          ref={sectorContainerRef}
          style={{
            width: '20%',
            fontSize: '0.01rem',
            marginTop: '2.5rem',
            marginRight: '2rem',
          }}
        ></div>
      </Flex>
    </>
  );
};

export default Sector;
