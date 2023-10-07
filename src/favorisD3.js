import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'; // Import D3 library
import Papa from 'papaparse';
function FavorisD3() {
    const [favoriteBrandsData, setFavoriteBrandsData] = useState({});
    const svgRef = useRef(null);
  
    useEffect(() => {
      Papa.parse(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS65hgo4JlFyIrIzQdpPaLiaUMZw9VfC7aHbWlbQXw7WIfeBRD6jEJkf6LfADiXjZcXdGNP7c6XgCTB/pub?gid=610042587&single=true&output=csv',
        {
          download: true,
          header: true,
          complete: (result) => {
            const data = result.data.map((row) => row['Quelles sont vos marques de voitures préferées ?']);
            const choices = [
              'Mercedes', 'Renault', 'Citroen', 'BMW', 'Porsche', 'Hyundai', 'Opel',
              'Seat', 'Toyota', 'Volkswagen', 'Nissan', 'Tesla', 'Audi',
            ];
  
            const brandCounts = {};
            choices.forEach((choice) => {
              brandCounts[choice] = 0;
            });
  
            data.forEach((choices) => {
              const selectedBrands = choices.split(', ');
              selectedBrands.forEach((brand) => {
                if (brandCounts.hasOwnProperty(brand)) {
                  brandCounts[brand] += 1;
                }
              });
            });
  
            setFavoriteBrandsData(brandCounts);
          },
        }
      );
    }, []);
  let width = 500;
  let height = 300; 
    useEffect(() => {
      if (!favoriteBrandsData) return;
  
      const svg = d3.select(svgRef.current);
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  
      const x = d3.scaleBand()
        .domain(Object.keys(favoriteBrandsData))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(Object.values(favoriteBrandsData))])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      svg.selectAll('*').remove();
  
      const chart = svg.append('g');
  
      chart.selectAll('rect')
        .data(Object.entries(favoriteBrandsData))
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
        .call(d3.axisBottom(x));
  
      chart.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
  
      return () => {
        svg.selectAll('*').remove();
      };
    }, [favoriteBrandsData]);
  
    return (
      <div>
        <h1>Favorite Car Brands</h1>
        <svg ref={svgRef} width={width} height={height}></svg>
      </div>
    );
  }
  export default FavorisD3;