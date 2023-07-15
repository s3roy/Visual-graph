import { Box } from '@chakra-ui/react';
import * as d3 from 'd3';
import { schemeCategory10 } from 'd3-scale-chromatic';
import React, { useEffect, useRef, useState } from 'react';

import useFetchSector from '@/hooks/useFetchSector';

const Sector = () => {
  const [sortBy, setSortBy] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  const { sectors, loading } = useFetchSector(sortBy, filterValue);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Fetch sectors whenever sortBy or filterValue changes
    // You can perform additional logic here if needed
    // For example, you can validate the values before making the API call
    // and handle any error scenarios
    // Make sure to handle cleanup if necessary

    return () => {
      // Cleanup code if needed
    };
  }, [sortBy, filterValue]);

  useEffect(() => {
    if (!sectors || loading || !svgRef.current) return;

    // Convert sectors object to an array
    const sectorsArray = Object.entries(sectors).map(([sector, count]) => ({
      sector,
      count,
    }));

    // Remove any existing chart elements
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up the dimensions and radius for the donut chart
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight * 0.8;
    const radius = Math.min(width, height) / 2;

    // Create the SVG container
    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      // .attr('width', width)
      // .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2}) scale(1.5)`);

    // Define the color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(sectorsArray.map((sector: any) => sector.sector))
      .range(schemeCategory10);

    // Compute the total count of sectors
    const totalCount = d3.sum(sectorsArray, (d: any) => d.count);

    // Create the pie generator
    const pie = d3
      .pie<any>()
      .value((d: any) => d.count)
      .sort(null);

    // Generate the arc paths
    const arc = d3
      .arc<any, d3.PieArcDatum<any>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    // Generate the label positions
    const labelArc = d3
      .arc<any, d3.PieArcDatum<any>>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Create the slices
    const slices = svg
      .selectAll('.slice')
      .data(pie(sectorsArray))
      .enter()
      .append('g')
      .attr('class', 'slice');

    // Draw the arc paths
    slices
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => color(d.data.sector));

    // Add labels to the slices
    slices
      .append('text')
      .attr('transform', (d: any) => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(
        (d: any) =>
          `${d.data.sector} (${((d.data.count / totalCount) * 100).toFixed(
            1
          )}%)`
      );

    const sectorContainer = d3
      .select(svgRef.current.parentElement)
      .append('div');
    sectorContainer
      .selectAll('.sector')
      .data(sectorsArray)
      .enter()
      .append('div')
      .attr('class', 'sector')
      .style('display', 'flex')
      .style('align-items', 'center');

    sectorContainer
      .selectAll('.sector')
      .append('div')
      .style('width', '10px')
      .style('height', '10px')
      .style('border-radius', '50%')
      .style('background-color', (d: any) => color(d.sector));

    sectorContainer
      .selectAll('.sector')
      .append('div')
      .text((d: any) => d.sector)
      .style('font-size', 'x-small');
  }, [loading, sectors]);

  return (
    <Box width="80%" height="lg" display="flex">
      <h1>Sector Chart</h1>
      <svg ref={svgRef} style={{ width: '70%', height: '70%' }}></svg>
      <div style={{ width: '20%', fontSize: '0.01rem' }}></div>
    </Box>
  );
};

export default Sector;
