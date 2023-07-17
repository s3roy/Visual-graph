import { Box, Flex, IconButton } from '@chakra-ui/react';
import User from '@mui/icons-material/AccountCircleOutlined';
import Shortcut from '@mui/icons-material/GridViewOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TranslateIcon from '@mui/icons-material/TranslateOutlined';
import Day from '@mui/icons-material/WbSunnyOutlined';
import React from 'react';

import CustomSearchModal from './customModals/CustomSearchModal';

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  return (
    <Flex
      height="16"
      width="79.5vw"
      border="1px"
      ml="12"
      my="4"
      borderRadius="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <CustomSearchModal />

      <Box display="flex">
        <IconButton
          variant="ghost"
          icon={<TranslateIcon />}
          aria-label="translate"
        />
        <IconButton variant="ghost" icon={<Day />} aria-label="theme" />
        <IconButton variant="ghost" icon={<Shortcut />} aria-label="shortcut" />
        <IconButton
          variant="ghost"
          icon={<NotificationsIcon />}
          aria-label="notifications"
        />

        <Box>
          <IconButton
            variant="ghost"
            icon={<User />}
            aria-label="user profile"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default SearchBox;
