import { Box, Flex } from '@chakra-ui/react';
import CircleIcon from '@mui/icons-material/CircleOutlined';
import { useState } from 'react';

const CountryBased = () => {
  const [data, setData] = useState({
    sectors: Number,
    intensity: Number,
    relevance: Number,
  });

  const [isActive, setIsActive] = useState(true);

  return (
    <Flex
      bg="#7367F0"
      ml="12"
      mt="6"
      position={'relative'}
      height="2xs"
      width="41vw"
      borderRadius="md"
    >
      <Box position={'absolute'} right={4} top={2} fontSize="xs">
        <CircleIcon fontSize="inherit" />
        <CircleIcon fontSize="inherit" />
      </Box>
      <Box></Box>
      <Box></Box>
    </Flex>
  );
};

export default CountryBased;
