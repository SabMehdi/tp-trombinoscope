
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import Papa from 'papaparse';

function CriteresD3() {
  const [criteriaData, setCriteriaData] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS65hgo4JlFyIrIzQdpPaLiaUMZw9VfC7aHbWlbQXw7WIfeBRD6jEJkf6LfADiXjZcXdGNP7c6XgCTB/pub?gid=610042587&single=true&output=csv',
      {
        download: true,
        header: true,
        complete: (result) => {
          const data = result.data.map((row) =>
            row['Quelles sont les critères les plus importantes dans une voiture pour vous ?']
          );
          setCriteriaData(data);
        },
      }
    );
  }, []);

  useEffect(() => {
    if (criteriaData.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const criteriaCounts = {};

    criteriaData.forEach((criteria) => {
      const selectedCriteria = criteria.split(', ');
      selectedCriteria.forEach((criterion) => {
        if (criteriaCounts.hasOwnProperty(criterion)) {
          criteriaCounts[criterion] += 1;
        } else {
          criteriaCounts[criterion] = 1;
        }
      });
    });

    const criteriaLabels = Object.keys(criteriaCounts);
    const responseCounts = Object.values(criteriaCounts);

    const x = d3
      .scaleBand()
      .domain(criteriaLabels)
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(responseCounts)])
      .nice()
      .range([height, 0]); // Adjust the range to start from the top

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.selectAll('*').remove();

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top + height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg
      .selectAll('rect')
      .data(criteriaLabels)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d))
      .attr('y', (d) => y(criteriaCounts[d]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(criteriaCounts[d]))
      .style('fill', 'rgba(75, 192, 192, 0.2)')
      .style('stroke', 'rgba(75, 192, 192, 1)')
      .style('stroke-width', 1);

  }, [criteriaData]);

  return (
    <div>
      <h1>Criteria Preferences</h1>
      <svg ref={svgRef} width={500} height={300}></svg>
    </div>
  );
}

export default CriteresD3;
