import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/kpi/Navbar';
import SearchBox from '@/components/searchbar/SearchBox';

const homepage = () => {
  return (
    <Flex>
      <Navbar />
      <SearchBox />
    </Flex>
  );
};

export default homepage;
