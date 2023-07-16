import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';

import Charts from '@/components/charts/Charts';
import Navbar from '@/components/kpi/Navbar';
import SearchBox from '@/components/searchbar/SearchBox';
import SectorAnalytics from '@/components/SectorAnalytics/SectorAnalytics';
import { getApiCall } from '@/utils/api';

interface HomePageProps {
  cityList: string[];
  countryList: string[];
  startYearList: number[];
  endYearList: number[];
}
const homepage: React.FC<HomePageProps> = ({
  cityList,
  countryList,
  startYearList,
  endYearList,
}) => {
  return (
    <Flex>
      <Navbar />
      <Box width="80vw">
        <SearchBox />
        <Grid>
          <GridItem>
            <SectorAnalytics cityList={cityList} />
          </GridItem>

          <GridItem>
            <Charts
              cityList={cityList}
              countryList={countryList}
              startYearList={startYearList}
              endYearList={endYearList}
            />
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let cityList = [];
  let countryList = [];
  let startYearList = [];
  let endYearList = [];

  try {
    cityList = (await getApiCall('cities')) || [];
    countryList = (await getApiCall('countries')) || [];
    startYearList = (await getApiCall('start-years')) || [];
    endYearList = (await getApiCall('end-years')) || [];
  } catch (error) {
    console.error('Error fetching data in getServerSideProps', error);
  }

  return {
    props: {
      cityList,
      countryList,
      startYearList,
      endYearList,
    },
  };
};

export default homepage;
