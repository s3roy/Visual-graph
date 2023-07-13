import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

interface CustomSearchModalProps {}
const CustomSearchModal: React.FC<CustomSearchModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Box
        ml="4"
        display="flex"
        alignItems="center"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <IconButton
          aria-label="Search"
          variant="ghost"
          icon={<SearchIcon />}
          isRound
        />
        <Text fontSize="lg" ml="2">
          Search
        </Text>
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            <Box
              display="flex"
              justifyContent="space-between"
              height="10"
              width="full"
              alignItems="center"
            >
              <Box display="flex" color="GrayText">
                <IconButton
                  aria-label="Search"
                  icon={<SearchIcon />}
                  variant="ghost"
                />
                <Input placeholder="Search" variant="unstyled" />
              </Box>

              <Box
                color="GrayText"
                display="flex"
                alignItems="center"
                onClick={onClose}
              >
                <Text fontSize="sm">[esc]</Text>
                <IconButton
                  aria-label="Search"
                  variant="ghost"
                  color="gray"
                  icon={<SmallCloseIcon />}
                />
              </Box>
            </Box>
          </ModalHeader>
          <Divider />

          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(1px) hue-rotate(90deg)"
  />
);

export default CustomSearchModal;
