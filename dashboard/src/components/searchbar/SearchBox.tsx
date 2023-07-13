import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import User from '@mui/icons-material/AccountCircleOutlined';
import Shortcut from '@mui/icons-material/GridViewOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TranslateIcon from '@mui/icons-material/TranslateOutlined';
import Day from '@mui/icons-material/WbSunnyOutlined';
import React from 'react';

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  return (
    <Flex
      height="16"
      width="full"
      border="1px"
      mr="16"
      ml="12"
      my="4"
      borderRadius="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box ml="4" display="flex" alignItems="center">
        <IconButton aria-label="Search" icon={<SearchIcon />} />
        <Text fontSize="lg" ml="2">
          Search
        </Text>
      </Box>

      <Box display="flex">
        <IconButton variant="ghost" icon={<TranslateIcon />} aria-label={''} />
        <IconButton variant="ghost" icon={<Day />} aria-label={''} />
        <IconButton variant="ghost" icon={<Shortcut />} aria-label={''} />
        <IconButton
          variant="ghost"
          icon={<NotificationsIcon />}
          aria-label={''}
        />

        <Box>
          <IconButton variant="ghost" icon={<User />} aria-label={''} />
        </Box>
      </Box>
    </Flex>
  );
};

export default SearchBox;
