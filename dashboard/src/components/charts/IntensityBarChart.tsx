import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface DataPoint {
  topic: string;
  intensity: number;
}

interface IntensityBarChartProps {
  data: DataPoint[];
}

const IntensityBarChart: React.FC<IntensityBarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartContainer = d3.select(chartRef.current);

    // Clear previous chart
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
      .domain([0, d3.max(data, (d) => (d.intensity + 5) as number) as number])
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
      .attr('y', (d) => yScale(d.intensity) as number)
      .attr('width', xScale.bandwidth())
      .attr(
        'height',
        (d) => height - margin.bottom - (yScale(d.intensity) as number)
      )
      .attr('fill', 'steelblue');

    // Create x-axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Create y-axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Add event listeners for mouseover and mouseout
    bars.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);

    // Mouseover event handler
    function handleMouseOver(event: any, d: DataPoint) {
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
        .text(`Topic: ${d.topic}, Intensity: ${d.intensity}`);
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

  return <Box ref={chartRef} width="100%" />;
};

export default IntensityBarChart;
