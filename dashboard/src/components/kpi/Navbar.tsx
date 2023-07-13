import { Stack } from '@chakra-ui/react';
import React from 'react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Stack height="100vh" borderRight="1px" width="sm">
      <div>Hello</div>
      <div>World</div>
    </Stack>
  );
};

export default Navbar;
