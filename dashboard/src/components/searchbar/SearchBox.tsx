import { Flex, Box, Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import TranslateIcon from '@mui/icons-material/TranslateOutlined';
import Day from '@mui/icons-material/WbSunnyOutlined';
import Shortcut from '@mui/icons-material/GridViewOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import User from '@mui/icons-material/AccountCircleOutlined';

const SearchBox: React.FC<> = () => {
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
        <IconButton variant="ghost" icon={<TranslateIcon />} />
        <IconButton variant="ghost" icon={<Day />} />
        <IconButton variant="ghost" icon={<Shortcut />} />
        <IconButton variant="ghost" icon={<NotificationsIcon />} />

        <Box>
          <IconButton variant="ghost" icon={<User />} />
        </Box>
      </Box>
    </Flex>
  );
};

export default SearchBox;
