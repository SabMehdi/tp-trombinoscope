
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { useData } from './DataContext';
function CriteresD3() {
  const [criteriaData, setCriteriaData] = useState([]);
  const svgRef = useRef(null);
  const data = useData();
  useEffect(() => {

    const dataaa = data.map((row) =>
      row['Quelles sont les critères les plus importantes dans une voiture pour vous ?']
    );

    const criterias = [
      "Look et design"
      , "Performance"
      , "Prix"
      , "Endurance"
      , "Conservation de la valeur"
      , "Economie de consomation d'energie"]

    const criteriaCounts = {};

    criterias.forEach((criteria) => {
      criteriaCounts[criteria] = 0
    })

    dataaa.forEach((criterias) => {
      const selectedCriterias = criterias.split(', ');
      selectedCriterias.forEach((criteria) => {
        if (criteriaCounts.hasOwnProperty(criteria)) {
          criteriaCounts[criteria] += 1;
        }
      });
    })

    setCriteriaData(criteriaCounts)
    console.log(criteriaCounts)
  }, [data]);

  let width = 500;
  let height = 300;
  useEffect(() => {
    if (!criteriaData) return;

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3.scaleBand()
      .domain(Object.keys(criteriaData))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(Object.values(criteriaData))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('*').remove();

    const chart = svg.append('g');

    chart.selectAll('rect')
      .data(Object.entries(criteriaData))
      .join('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d[1]))
      .attr('fill', 'rgba(75, 192, 192, 0.2)')
      .attr('stroke', 'rgba(75, 192, 192, 1)')
      .attr('stroke-width', 1);

    chart.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text') 
      .style('text-anchor', 'end') 
      .attr('dx', '-0.5em')
      .attr('dy', '0.15em')
      .attr('transform', 'rotate(-45)');

    chart.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    return () => {
      svg.selectAll('*').remove();
    };
  }, [criteriaData]);

  return (
    <div>
      <h1>Favorite Car Brands</h1>
      <svg ref={svgRef} width={width} height={height+100}></svg>
    </div>
  );
}
export default CriteresD3;