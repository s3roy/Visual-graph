import { Box, Flex, Text } from '@chakra-ui/react';
import CircleIcon from '@mui/icons-material/Circle';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import useFetchHighest from '@/hooks/useFetchHighest';
import useFetchLowest from '@/hooks/useFetchLowest';
import getCountryFlags from '@/utils/getCountryFlag';

const CountryBased = () => {
  const {
    data: highestData,
    error: highestError,
    loading: highestLoading,
  } = useFetchHighest();
  const {
    data: lowestData,
    error: lowestError,
    loading: lowestLoading,
  } = useFetchLowest();

  const [isActive, setIsActive] = useState(true);
  const [lowestCountry, setLowestCountry] = useState<any>();
  const [highestCountry, setHighestCountry] = useState<any>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsActive((prevIsActive) => !prevIsActive);
    }, 10000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  useMemo(async () => {
    if (highestData && highestData.length > 0) {
      const countriesHighest = highestData.map((item) => item.country);
      const flagsHighest = await getCountryFlags(countriesHighest);
      setHighestCountry(flagsHighest[0]);
    }
    if (lowestData && lowestData.length > 0) {
      const countriesLowest = lowestData.map((item) => item.country);
      const flagsLowest = await getCountryFlags(countriesLowest);
      setLowestCountry(flagsLowest[0]);
    }
  }, [highestData, lowestData]);

  const handleHighestClick = () => {
    setIsActive(true);
  };

  const handleLowestClick = () => {
    setIsActive(false);
  };

  return (
    <Flex
      bg="#7367F0"
      ml={{ base: '2', md: '12' }}
      mt={{ base: '2', md: '6' }}
      position={'relative'}
      height={{ base: 'xs', md: '2xs' }}
      width={{ base: '80vw', md: '41vw' }}
      borderRadius="md"
      direction={{ base: 'column', md: 'row' }}
      justify="center"
    >
      <Box position={'absolute'} right={4} top={2} fontSize="xs">
        <CircleIcon
          fontSize="inherit"
          onClick={handleHighestClick}
          style={{
            color: isActive ? 'white' : 'inherit',
            marginRight: '0.2rem',
          }}
        />

        <CircleIcon
          fontSize="inherit"
          onClick={handleLowestClick}
          style={{
            color: !isActive ? 'white' : 'inherit',
          }}
        />
      </Box>
      {isActive && (
        <Flex>
          <Box>
            <Text
              fontFamily="cursive"
              fontSize="3xl"
              fontWeight="extrabold"
              color="white"
              mt="4"
              ml="12"
            >
              Country Analytics
            </Text>
            <Text
              fontFamily="cursive"
              fontSize="sm"
              fontWeight="light"
              color="white"
              mt="-1"
              ml="20"
            >
              Country with highest sectors
            </Text>
            {/* Show more data */}
            {highestData?.map((data, index) => (
              <Box key={index}>
                <Text>Country: {data.country}</Text>
                <Text>Sector: {data.sector}</Text>
                <Text>Intensity: {data.intensity}</Text>
                <Text>Relevance: {data.relevance}</Text>
              </Box>
            ))}
          </Box>
          <Box mt="16" ml="36">
            <Image
              src={highestCountry}
              alt="country"
              width={300}
              height={300}
            />
          </Box>
        </Flex>
      )}
      {!isActive && (
        <Flex>
          <Box>
            <Text
              fontFamily="cursive"
              fontSize="28"
              fontWeight="extrabold"
              color="white"
              mt="4"
              ml="12"
            >
              Country Analytics
            </Text>
            <Text
              fontFamily="cursive"
              fontSize="sm"
              fontWeight="light"
              color="white"
              mt="-1"
              ml="20"
            >
              Country with lowest sectors
            </Text>
            {/* Show more data */}
            {lowestData?.map((data, index) => (
              <Box key={index}>
                <Text>Country: {data.country}</Text>
                <Text>Sector: {data.sector}</Text>
                <Text>Intensity: {data.intensity}</Text>
                <Text>Relevance: {data.relevance}</Text>
              </Box>
            ))}
          </Box>
          <Box mt="16" ml="36">
            <Image src={lowestCountry} alt="country" width={300} height={300} />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default CountryBased;
