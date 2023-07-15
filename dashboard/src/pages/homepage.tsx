import { Box, Flex } from '@chakra-ui/react';

import Charts from '@/components/charts/Charts';
import Navbar from '@/components/kpi/Navbar';
import SearchBox from '@/components/searchbar/SearchBox';

const homepage = () => {
  return (
    <Flex>
      <Navbar />
      <Box width="80vw">
        <SearchBox />
        <Charts />
      </Box>
    </Flex>
  );
};

export default homepage;
