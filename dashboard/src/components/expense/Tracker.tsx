import {
  Box,
  Center,
  Flex,
  Progress,
  Tag,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';

const PROFIT = 'Profit';
const EXPENSE = 'Expense';
const EARNINGS = 'Earnings';

const Tracker = () => {
  return (
    <>
      <Box
        border="2px"
        borderColor="gray.300"
        borderRadius="lg"
        mt="6"
        ml="4"
        width="lg"
      >
        <Box mt="2">
          <Text
            fontFamily="cursive"
            fontWeight="bold"
            color="GrayText"
            ml="2"
            fontSize="3xl"
          >
            Earning Report
          </Text>
          <Text
            fontFamily="cursive"
            fontWeight="semibold"
            color="GrayText"
            ml="2"
          >
            Monthly Earning Overview
          </Text>
        </Box>

        <Flex justifyContent="space-around" alignItems="center" mt="12">
          <Box mb="4">
            <Center>
              <Tag size="lg" variant="subtle" colorScheme="blue">
                <TagLeftIcon boxSize="15px" as={AttachMoneyOutlinedIcon} />
              </Tag>
              <Text
                fontFamily="cursive"
                fontWeight="semibold"
                color="GrayText"
                ml="2"
              >
                {EARNINGS}
              </Text>
            </Center>
            <Text mt="6" fontWeight="semibold" color="GrayText">
              $545.69
            </Text>
            <Progress
              colorScheme="blue"
              size="xs"
              value={70}
              mt={2}
              borderRadius="full"
            />
          </Box>
          <Box mb="4">
            <Center>
              <Tag size="lg" variant="subtle" colorScheme="cyan">
                <TagLeftIcon boxSize="15px" as={PieChartOutlinedIcon} />
              </Tag>
              <Text
                fontFamily="cursive"
                fontWeight="semibold"
                color="GrayText"
                ml="2"
              >
                {PROFIT}
              </Text>
            </Center>
            <Text mt="6" fontWeight="semibold" color="GrayText">
              $256.34
            </Text>
            <Progress
              colorScheme="cyan"
              size="xs"
              value={30}
              mt={2}
              borderRadius="full"
            />
          </Box>
          <Box mb="4">
            <Center>
              <Tag size="lg" variant="subtle" colorScheme="red">
                <TagLeftIcon boxSize="15px" as={AddShoppingCartOutlinedIcon} />
              </Tag>
              <Text
                fontFamily="cursive"
                fontWeight="semibold"
                color="GrayText"
                ml="2"
              >
                {EXPENSE}
              </Text>
            </Center>
            <Text mt="6" fontWeight="semibold" color="GrayText">
              $12.75
            </Text>
            <Progress
              colorScheme="red"
              size="xs"
              value={12}
              mt={2}
              borderRadius="full"
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Tracker;
