import { Box, Flex, Text } from '@chakra-ui/react';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

import useFetchTopicIntensity from '@/hooks/useIntensityTopic';

import Filter from '../Filters/Filter';

interface IntensityBarChartProps {
  startYearList: Number[];
  endYearList: Number[];
}
const sortOptions = ['start year', 'end year'];
const IntensityBarChart: React.FC<IntensityBarChartProps> = ({
  startYearList,
  endYearList,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const { data } = useFetchTopicIntensity(sortBy, filterValue);

  useEffect(() => {
    const chartContainer = d3.select(chartRef.current);

    // ! Clear previous chart
    chartContainer.selectAll('*').remove();

    if (data.length > 0) {
      drawChart();
    }

    return () => {
      // Clean up chart when component unmounts
      chartContainer.selectAll('*').remove();
    };
  }, [data]);

  const drawChart = () => {
    // Set chart dimensions
    const width = chartRef.current?.clientWidth || 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create scales for x and y axes
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => (d.intensity ? d.intensity + 5 : 0)) as number,
      ])
      .range([height - margin.bottom, margin.top]);

    // Create SVG element
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height);

    // Create bars
    const bars = svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.topic) as number)
      .attr('y', (d) => yScale(d.intensity || 0) as number)
      .attr('width', xScale.bandwidth())
      .attr(
        'height',
        (d) => height - margin.bottom - (yScale(d.intensity || 0) as number)
      )
      .attr('fill', 'steelblue');

    // Create y-axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Add event listeners for mouseover and mouseout
    bars.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);

    // Mouseover event handler
    function handleMouseOver(
      event: any,
      d: { intensity: number | null; topic: string }
    ) {
      const selectedBar = d3.select(event.currentTarget);

      // Darken the fill color of the selected bar
      selectedBar.attr('fill', 'darkblue');

      // Get x and y positions for the tooltip
      const xPos = parseFloat(selectedBar.attr('x') || '0');
      const yPos = parseFloat(selectedBar.attr('y') || '0');

      // Create and show the tooltip
      svg
        .append('text')
        .attr('id', 'tooltip')
        .attr('x', xPos + xScale.bandwidth() / 2)
        .attr('y', yPos - 10)
        .attr('text-anchor', 'middle')
        .text(
          `Topic: ${d.topic}, Intensity: ${
            d.intensity !== null ? d.intensity : 'N/A'
          }`
        );
    }

    // Mouseout event handler
    function handleMouseOut(event: any) {
      const selectedBar = d3.select(event.currentTarget);

      // Restore the original fill color of the bar
      selectedBar.attr('fill', 'steelblue');

      // Remove the tooltip
      svg.select('#tooltip').remove();
    }
  };

  return (
    <Box>
      <Flex
        height="fit-content"
        border="2px"
        borderRadius="lg"
        ml="12"
        mt="2"
        mb="4"
        position="relative"
        justifyContent="space-between"
        borderColor="gray.400"
      >
        <Box width="full" ml="10">
          <Text
            mb="10"
            fontSize="4xl"
            pl="2"
            pt="5"
            fontFamily="cursive"
            color="GrayText"
            fontWeight="extrabold"
          >
            Intensity chart
          </Text>
          <Box position="absolute" right="2" top="0">
            <Filter
              sortBy={sortBy}
              filterValue={filterValue}
              setSortBy={setSortBy}
              setFilterValue={setFilterValue}
              sortOptions={sortOptions}
              filterValues={{
                startYear: startYearList.map(String),
                endYear: endYearList.map(String),
              }}
            />
          </Box>
          <Box ref={chartRef} width="100%" />
        </Box>
      </Flex>
    </Box>
  );
};

export default IntensityBarChart;
