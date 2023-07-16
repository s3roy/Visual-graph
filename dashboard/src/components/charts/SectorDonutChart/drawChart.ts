import * as d3 from 'd3';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { RefObject } from 'react';

interface SectorsArrayItem {
  sector: string;
  count: number;
}

const drawChart = (
  svgRef: RefObject<SVGSVGElement>,
  sectorContainerRef: RefObject<HTMLDivElement>,
  sectorsArray: SectorsArrayItem[],
  loading: boolean
) => {
  if (
    !sectorsArray ||
    loading ||
    !svgRef.current ||
    !sectorContainerRef.current
  )
    return;

  d3.select(svgRef.current).selectAll('*').remove();

  const width = svgRef.current.clientWidth * 0.6;
  const height = svgRef.current.clientHeight * 0.8;
  const radius = Math.min(width, height) / 2;

  const svg = d3
    .select(svgRef.current)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2}) scale(1.5)`);

  const color = d3
    .scaleOrdinal<string>()
    .domain(sectorsArray.map((sector: any) => sector.sector))
    .range(schemeCategory10);

  const totalCount = d3.sum(sectorsArray, (d: any) => d.count);

  const pie = d3
    .pie<any>()
    .value((d: any) => d.count)
    .sort(null);

  const arc = d3
    .arc<any, d3.PieArcDatum<any>>()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  const slices = svg
    .selectAll('.slice')
    .data(pie(sectorsArray))
    .enter()
    .append('g')
    .attr('class', 'slice');

  slices
    .append('path')
    .attr('d', arc)
    .attr('fill', (d: any) => color(d.data.sector))
    .on('mouseenter', function (event, d) {
      // On mouse enter, make all the arcs a bit transparent
      slices.selectAll('path').style('opacity', 0.3);

      // Highlight the arc that is being hovered
      d3.select(this).style('opacity', 1);

      // Show tooltip with sector name and count
      const tooltip = document.getElementById('tooltip') as HTMLElement;
      tooltip.style.visibility = 'visible';
      tooltip.textContent = `${d.data.sector} (${(
        (d.data.count / totalCount) *
        100
      ).toFixed(1)}%)`;
    })
    .on('mousemove', function (event) {
      // Move the tooltip with the mouse
      const tooltip = document.getElementById('tooltip') as HTMLElement;
      tooltip.style.top = `${event.pageY - 10}px`;
      tooltip.style.left = `${event.pageX + 10}px`;
    })
    .on('mouseleave', function () {
      // On mouse leave, restore the colors and hide the tooltip
      slices.selectAll('path').style('opacity', 1);
      const tooltip = document.getElementById('tooltip') as HTMLElement;
      tooltip.style.visibility = 'hidden';
    });

  svg
    .append('text')
    .attr('text-anchor', 'middle') // to ensure the text is centered at given position
    .attr('dy', '.3em') // shift text down a bit
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .style('fill', 'darkgray') // use fill to change the color of SVG text
    .text(`${totalCount}`);

  const sectorContainer = d3.select(sectorContainerRef.current);

  sectorContainer.selectAll('*').remove();

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

  return () => {
    if (svgRef.current) d3.select(svgRef.current).selectAll('*').remove();
    if (sectorContainerRef.current)
      d3.select(sectorContainerRef.current).selectAll('*').remove();
  };
};

export default drawChart;
