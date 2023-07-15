import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Stack height="100vh" borderRight="1px" width="15vw">
      <Image></Image>
      <Box>
        <Text>Heading</Text>
        <div>
          <Text>Sub 1</Text>
          <Text>Sub 2</Text>
        </div>
      </Box>
    </Stack>
  );
};

export default Navbar;
