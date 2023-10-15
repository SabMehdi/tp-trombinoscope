import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { useData } from './DataContext';
function AgeD3() {
  const [histogramData, setHistogramData] = useState([]);
  const svgRef = useRef(null);
  const data=useData();
  useEffect(() => {
    
          const ages = data
            .map((row) => parseInt(row['Age'], 10))
            .filter((age) => !isNaN(age));
          setHistogramData(ages);

       
  }, [data]);

  useEffect(() => {
    if (histogramData.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([0, 100]) 
      .range([0, width]);

    const bins = d3.histogram().domain(x.domain()).thresholds(x.ticks(10))(histogramData);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .nice()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.selectAll('*').remove();

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', (d) => x(d.x0) + 1)
      .attr('width', (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr('y', (d) => y(d.length))
      .attr('height', (d) => y(0) - y(d.length))
      .style('fill', 'steelblue');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top + height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);
  }, [histogramData]);

  return (
    <div>
      <h1>Histogram of Age</h1>
      <svg ref={svgRef} width={500} height={300}></svg>
    </div>
  );
}

export default AgeD3;
