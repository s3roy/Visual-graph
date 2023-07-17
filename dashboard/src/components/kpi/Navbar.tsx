import { CalendarIcon, ChatIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import React from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsBarChart } from 'react-icons/bs';
import { FaChartBar } from 'react-icons/fa';

import { COMPANY_NAME } from '@/utils/constants';

interface NavbarProps {}

const Logo = () => (
  <Stack direction="row" align="center" spacing={2} marginLeft={2}>
    <FaChartBar size={40} color="red" />
  </Stack>
);

const links = [
  { Icon: BiUser, text: 'User' },
  { Icon: EmailIcon, text: 'Email' },
  { Icon: ChatIcon, text: 'Chat' },
  { Icon: BsBarChart, text: 'Charts' },
  { Icon: CalendarIcon, text: 'Calendar' },
  { Icon: LockIcon, text: 'Roles & Permissions' },
  { Icon: AiOutlinePhone, text: 'Raise Support' },
];

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Stack
      height="auto"
      borderRight="1px"
      width={['60vw', '30vw', '20vw', '15vw']}
      position="relative"
    >
      <Box mt="4">
        <Stack direction="row">
          <Logo />
          <Text fontSize="4xl" ml={2} color="blue" fontFamily="fantasy">
            {COMPANY_NAME}
          </Text>
        </Stack>
        <Text fontSize="2xl" p={3} mt="6" fontFamily="cursive">
          Apps & Pages
        </Text>
        <div>
          <Stack spacing={2}>
            {links.map(({ Icon, text }) => (
              <Box key={text}>
                <Box
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  pl={2}
                  _hover={{ border: '1px solid blue', borderRadius: '4px' }}
                >
                  <Box
                    width="3rem"
                    height="3rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml="4"
                  >
                    <Icon boxSize={6} />
                  </Box>
                  <Text ml={4}>{text}</Text>
                </Box>
              </Box>
            ))}
            <Box
              position="absolute"
              fontSize="3rem"
              right="8"
              bottom="10"
              border="1px"
              color="purple"
              borderRadius="full"
              cursor="pointer"
              _hover={{ fontSize: '4rem' }}
            >
              <SupportAgentIcon fontSize="inherit" color="info" />
            </Box>
          </Stack>
        </div>
      </Box>
    </Stack>
  );
};

export default Navbar;
