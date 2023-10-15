import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'; 
import { useData } from './DataContext';
function HistPermisD3() {
    const [pieChartData, setPieChartData] = useState([0, 0]); 
    const svgRef = useRef(null);
    const data=useData();
    useEffect(() => {
            const responses = data.map((row) => row['As-tu un permis B ?']);
            const ouiCount = responses.filter((response) => response === 'Oui').length;
            const nonCount = responses.filter((response) => response === 'Non').length;
            setPieChartData([ouiCount, nonCount]);
          
          
  }, [data]);
    useEffect(() => {
      if (!pieChartData) return;
  
      const svg = d3.select(svgRef.current);
      const width = 500;
      const height = 500;
      const radius = Math.min(width, height) / 2;
      const colors = d3.scaleOrdinal(['green', 'red']);
  
      const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
  
      const pie = d3.pie()(pieChartData);
  
      svg.selectAll('*').remove();
  
      const chart = svg
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
  
      chart
        .selectAll('path')
        .data(pie)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d, i) => colors(i));
  
      const labelArc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius * 0.6);
  
      chart
        .selectAll('text')
        .data(pie)
        .enter()
        .append('text')
        .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
        .attr('dy', '0.35em')
        .text((d) => d.data);
  
      return () => {
        svg.selectAll('*').remove();
      };
    }, [pieChartData]);
  
    return (
      <div style={{ width: '500px', height: '500px' }}>
        <svg ref={svgRef} width={500} height={500}></svg>
      </div>
    );
  }

export default HistPermisD3;