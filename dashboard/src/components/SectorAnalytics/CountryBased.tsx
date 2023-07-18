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

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  const AnalyticsSection = ({
    data,
    label,
    imageSrc,
  }: {
    data: any;
    label: string;
    imageSrc: string;
  }) => (
    <Flex>
      <Box>
        <Text
          fontFamily="cursive"
          fontSize="md"
          fontWeight="extrabold"
          color="white"
          mt="2"
        >
          Country Analytics
        </Text>
        <Text
          fontSize="sm"
          fontWeight="light"
          color="white"
          mt="-1"
          padding="2"
          ml="3"
        >
          {label}
        </Text>
        {data?.map((data: any, index: number) => (
          <Box key={index} ml="3">
            <Text fontWeight="bold">Country: {data.country}</Text>
            <Text fontWeight="bold">Sector: {data.sector}</Text>
            <Text fontWeight="bold">Intensity: {data.relevance}</Text>
            <Text fontWeight="bold">Relevance: {data.relevance}</Text>
          </Box>
        ))}
      </Box>
      <Box mt="3" ml="2">
        <Image src={imageSrc} alt="country" width={100} height={100} />
      </Box>
    </Flex>
  );

  return (
    <Flex
      bg="#7367F0"
      ml="12"
      mt="6"
      position="relative"
      height="34vh"
      width="45%"
      borderRadius="md"
    >
      <Box position="absolute" right={3} top={2} fontSize="md">
        <CircleIcon
          fontSize="inherit"
          onClick={handleToggleActive}
          style={{
            color: isActive ? 'white' : 'inherit',
            marginRight: '0.2rem',
          }}
        />
        <CircleIcon
          fontSize="inherit"
          onClick={handleToggleActive}
          style={{ color: !isActive ? 'white' : 'inherit' }}
        />
      </Box>

      {isActive ? (
        <AnalyticsSection
          data={highestData}
          label="Country with highest sectors"
          imageSrc={highestCountry}
        />
      ) : (
        <AnalyticsSection
          data={lowestData}
          label="Country with lowest sectors"
          imageSrc={lowestCountry}
        />
      )}
    </Flex>
  );
};

export default CountryBased;
