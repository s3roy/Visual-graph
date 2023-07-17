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
      ml={{ base: '1', md: '3', lg: '10' }}
      mt={{ base: '1', md: '3', lg: '5' }}
      position={'relative'}
      height={{ base: '10vh', md: '20vh', lg: '30vh' }}
      width={{ base: '75vw', md: '50vw', lg: '30vw' }}
      borderRadius="md"
      justify="center"
    >
      <Box
        position={'absolute'}
        right={3}
        top={2}
        fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
      >
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
              fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
              fontWeight="extrabold"
              color="white"
              mt={{ base: '1', md: '2', lg: '3' }}
              ml={{ base: '2', md: '5', lg: '8' }}
            >
              Country Analytics
            </Text>
            <Text
              fontFamily="cursive"
              fontSize={{ base: 'xs', sm: 'sm', md: 'sm', lg: 'md' }}
              fontWeight="light"
              color="white"
              mt="-1"
              ml={{ base: '3', sm: '6', md: '10', lg: '14' }}
            >
              Country with highest sectors
            </Text>
            {highestData?.map((data, index) => (
              <Box key={index} ml={{ base: '1', sm: '3', md: '5', lg: '7' }}>
                <Text>Country: {data.country}</Text>
                <Text>Sector: {data.sector}</Text>
                <Text>Intensity: {data.intensity}</Text>
                <Text>Relevance: {data.relevance}</Text>
              </Box>
            ))}
          </Box>
          <Box
            mt={{ base: '3', md: '6', lg: '12' }}
            ml={{ base: '2', md: '12', lg: '24' }}
          >
            <Image
              src={highestCountry}
              alt="country"
              width={100}
              height={100}
            />
          </Box>
        </Flex>
      )}
      {!isActive && (
        <Flex>
          <Box>
            <Text
              fontFamily="cursive"
              fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
              fontWeight="extrabold"
              color="white"
              mt={{ base: '1', md: '2', lg: '3' }}
              ml={{ base: '2', md: '5', lg: '8' }}
            >
              Country Analytics
            </Text>
            <Text
              fontFamily="cursive"
              fontSize={{ base: 'xs', sm: 'sm', md: 'sm', lg: 'md' }}
              fontWeight="light"
              color="white"
              mt="-1"
              ml={{ base: '3', sm: '6', md: '10', lg: '14' }}
            >
              Country with lowest sectors
            </Text>
            {lowestData?.map((data, index) => (
              <Box key={index} ml={{ base: '1', sm: '3', md: '5', lg: '7' }}>
                <Text>Country: {data.country}</Text>
                <Text>Sector: {data.sector}</Text>
                <Text>Intensity: {data.intensity}</Text>
                <Text>Relevance: {data.relevance}</Text>
              </Box>
            ))}
          </Box>
          <Box
            mt={{ base: '3', md: '6', lg: '12' }}
            ml={{ base: '2', md: '12', lg: '24' }}
          >
            <Image src={lowestCountry} alt="country" width={100} height={100} />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default CountryBased;
