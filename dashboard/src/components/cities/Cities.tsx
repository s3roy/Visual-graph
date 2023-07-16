import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Flex, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface CityData {
  city: string;
  growth: number;
}

interface CityProps {
  cityList: string[];
}

const Cities: React.FC<CityProps> = ({ cityList }) => {
  const [growthData, setGrowthData] = useState<CityData[]>([]);
  const upColor = useColorModeValue('green.500', 'green.200');
  const downColor = useColorModeValue('red.500', 'red.200');

  useEffect(() => {
    setGrowthData(
      cityList.slice(0, 5).map((city) => ({
        city,
        growth: Math.floor(Math.random() * 101) - 50, // Random growth between -50 and 50
      }))
    );
  }, [cityList]);

  const growthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <Flex align="center" color={upColor}>
          <ArrowUpIcon boxSize={4} />
          <Text ml={2}>{Math.abs(growth)}%</Text>
        </Flex>
      );
    } else {
      return (
        <Flex align="center" color={downColor}>
          <ArrowDownIcon boxSize={4} />
          <Text ml={2}>{Math.abs(growth)}%</Text>
        </Flex>
      );
    }
  };

  return (
    <Box
      border="2px"
      borderRadius="lg"
      borderColor="gray.300"
      p={4}
      mt="6"
      ml="4"
      width="xs"
    >
      <Text
        fontSize="lg"
        fontWeight="bold"
        mb={4}
        color="GrayText"
        fontFamily="cursive"
      >
        City Growth Report
      </Text>
      {growthData.map(({ city, growth }) => (
        <Flex key={city} align="center" mb={2}>
          <Text fontWeight="medium" fontFamily="cursive">
            {city}
          </Text>
          <Spacer />
          {growthIndicator(growth)}
        </Flex>
      ))}
    </Box>
  );
};

export default Cities;
