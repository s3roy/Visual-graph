import { CalendarIcon, ChatIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsBarChart } from 'react-icons/bs';
import { FaChartBar } from 'react-icons/fa';

interface NavbarProps {}

const Logo = () => (
  <Stack direction="row" align="center" spacing={2} marginLeft="8px">
    <FaChartBar size={38} color="red" />
  </Stack>
);

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Stack height="100vh" borderRight="1px" width="15vw" pr="8">
      {/* <Box boxSize='sm'>
        <Image src="" alt="Description of the image" boxSize="100" objectFit="contain" />
      </Box> */}
      <Box>
        <Stack direction="row">
          <Logo />
          <Text fontSize="32" ml={2} color="blue" fontFamily="fantasy">
            DataVisify
          </Text>
        </Stack>
        <Text fontSize="sm" padding="3">
          Apps & Pages
        </Text>
        <div>
          <Stack spacing={2}>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={BiUser} boxSize={8} padding="5px" />
                <Text marginLeft="5px">User</Text>
              </Box>
            </Link>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={EmailIcon} boxSize={8} padding="5px" />
                <Text marginLeft="5px">Email</Text>
              </Box>
            </Link>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={ChatIcon} boxSize={8} padding="5px" />
                <Text marginLeft="5px">Chat</Text>
              </Box>
            </Link>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={BsBarChart} boxSize={8} padding="5px" />
                <Text marginLeft="5px">Charts</Text>
              </Box>
            </Link>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={CalendarIcon} boxSize={8} padding="5px" />
                <Text marginLeft="5px">Calendar</Text>
              </Box>
            </Link>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={LockIcon} boxSize={8} padding="5px" />
                <Text marginLeft="5px">Roles & Permissions</Text>
              </Box>
            </Link>
            <Link>
              <Box
                display="flex"
                alignItems="center"
                cursor="pointer"
                paddingLeft="10px"
                _hover={{ border: '1px solid blue', borderRadius: '4px' }}
              >
                <Icon as={AiOutlinePhone} boxSize={8} padding="5px" />
                <Text marginLeft="5px">Raise Support</Text>
              </Box>
            </Link>
          </Stack>
        </div>
      </Box>
    </Stack>
  );
};

export default Navbar;
