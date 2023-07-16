import { Box, Flex, Image, Text } from '@chakra-ui/react';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import { useEffect, useState } from 'react';

import useFetchCountryRelevance from '@/hooks/useFetchRelevance';
import getCountryFlags from '@/utils/getCountryFlag';

const CountryRelevance = () => {
  const [sortBy, setSortBy] = useState(true);
  const [flagUrls, setFlagUrls] = useState<any[]>([]);
  const { data, loading, error } = useFetchCountryRelevance();

  const sortedData = data?.sort(
    (a: { relevance_count: number }, b: { relevance_count: number }) =>
      b.relevance_count - a.relevance_count
  );
  const displayedData = sortBy
    ? sortedData?.slice(0, 6)
    : sortedData?.slice(-6);

  useEffect(() => {
    if (displayedData) {
      getCountryFlags(displayedData.map((item: any) => item.country))
        .then(setFlagUrls)
        .catch(console.error);
    }
  }, [displayedData]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box
      border="2px"
      borderColor="gray.400"
      ml="3"
      borderRadius="lg"
      mt="2"
      width="md"
      mr="10"
    >
      <Flex justifyContent="space-between">
        <Box>
          <Text
            fontSize="xl"
            fontFamily="cursive"
            color="GrayText"
            fontWeight="bold"
            mt="4"
            ml="4"
          >
            Relevance By Country
          </Text>
          <Text mt="2" ml="10" fontFamily="cursive" color="GrayText">
            Overview
          </Text>
        </Box>

        <Box onClick={() => setSortBy((sort) => !sort)} mt="2" mr="4">
          {sortBy ? (
            <SwitchRightOutlinedIcon style={{ color: 'gray' }} />
          ) : (
            <SwitchLeftOutlinedIcon style={{ color: 'gray' }} />
          )}
        </Box>
      </Flex>

      <Flex justifyContent="space-between" mt="4" mr="2" ml="2">
        <Text fontWeight="bold" color="GrayText" fontFamily="cursive">
          Country
        </Text>
        <Text fontWeight="bold" color="GrayText" fontFamily="cursive">
          Relevance
        </Text>
      </Flex>

      {displayedData?.map((item: any, index: any) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mt="2"
          mr="2"
          ml="2"
          key={index}
        >
          <Flex alignItems="center">
            <Image
              src={flagUrls[index]}
              boxSize="3rem"
              mr="4"
              alt={`${item.country} flag`} // Here we set a meaningful alt text
              borderRadius="full"
            />
            <Text fontFamily="cursive">{item.country}</Text>
          </Flex>
          <Text mr="8" fontFamily="cursive">
            {item.relevance_count}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default CountryRelevance;
