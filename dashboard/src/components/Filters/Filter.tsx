import { Box, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import React from 'react';

interface FilterProps {
  sortBy: string;
  filterValue: string;
  setSortBy: (value: string) => void;
  setFilterValue: (value: string) => void;
  sortOptions: string[];
  filterValues: { [key: string]: string[] };
}

const Filter: React.FC<FilterProps> = ({
  sortOptions,
  filterValues,
  sortBy,
  filterValue,
  setSortBy,
  setFilterValue,
}) => {
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value.toLowerCase());
    setFilterValue('');
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterValue(event.target.value.toLowerCase());
  };

  const getFilterOptions = () => {
    if (sortBy === 'end year') sortBy = 'endYear';
    if (sortBy === 'start year') sortBy = 'startYear';
    console.log(sortBy, filterValues);
    const options = filterValues[sortBy];
    if (options) {
      return options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ));
    }
    return <option value="">Select a sort option first</option>;
  };

  return (
    <Box width="20%" p="2">
      <FormControl id="sort-by" mb="3" width="full">
        <Select
          placeholder="Select filter type"
          textAlign="center"
          width="44"
          value={sortBy}
          onChange={handleSortByChange}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="filter-value" mb="3">
        <Select
          textAlign="center"
          width="36"
          placeholder="Select filter"
          value={filterValue}
          onChange={handleFilterValueChange}
        >
          {getFilterOptions()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
