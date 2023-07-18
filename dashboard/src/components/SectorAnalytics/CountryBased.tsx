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
          fontSize="3xl"
          fontWeight="extrabold"
          color="white"
          mt="4"
          ml="4"
        >
          Country Analytics
        </Text>
        <Text
          fontFamily="cursive"
          fontSize="sm"
          fontWeight="light"
          color="white"
          mt="-3"
          padding="2"
          ml="5"
        >
          {label}
        </Text>
        {data?.map((data: any, index: number) => (
          <Box key={index} ml="6" mt="8">
            <Flex gap="8">
              <Flex alignItems="center" gap="2">
                <Box
                  bg="#5c4dff"
                  boxSize="fit-content"
                  py="2"
                  px="4"
                  borderRadius="lg"
                  fontWeight="semibold"
                  color="white"
                >
                  {data.sector}
                </Box>
                <Text
                  fontFamily="cursive"
                  fontSize="sm"
                  fontWeight="light"
                  color="white"
                >
                  Sector
                </Text>
              </Flex>

              <Flex alignItems="center" gap="2">
                <Box
                  bg="#5c4dff"
                  boxSize="fit-content"
                  py="2"
                  px="4"
                  borderRadius="lg"
                  fontWeight="semibold"
                  color="white"
                >
                  {data?.intensity || data.relevance * 22.7}
                </Box>
                <Text
                  fontFamily="cursive"
                  fontSize="sm"
                  fontWeight="light"
                  color="white"
                >
                  Intensity
                </Text>
              </Flex>
            </Flex>

            <Flex alignItems="center" gap="2" mt="4">
              <Box
                bg="#5c4dff"
                boxSize="fit-content"
                py="2"
                px="4"
                borderRadius="lg"
                fontWeight="semibold"
                color="white"
              >
                {data?.relevance || 28 * 22.7}
              </Box>
              <Text
                fontFamily="cursive"
                fontSize="sm"
                fontWeight="light"
                color="white"
              >
                Relevance
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
      <Box position="absolute" right="4" bottom="4">
        <Box
          display="inline-block"
          width="8vw"
          height="16vh"
          borderRadius="full"
          overflow="hidden"
          boxShadow="2xl"
          border="2px solid white"
          position="relative"
        >
          <Image src={imageSrc} alt="country" layout="fill" objectFit="cover" />
        </Box>
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
          onClick={handleToggleActive}
          style={{
            color: isActive ? 'rgba(255, 255, 255, 0.7)' : '#4a3afb',
            marginRight: '0.2rem',
            fontSize: 15,
          }}
        />
        <CircleIcon
          onClick={handleToggleActive}
          style={{
            color: !isActive ? 'rgba(255, 255, 255, 0.7)' : '#4a3afb',
            fontSize: 15,
          }}
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
