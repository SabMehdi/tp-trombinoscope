import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import { useData } from './DataContext';

function HistPermis() {
  const [chart, setChart] = useState(null);
  const [pieChartData, setPieChartData] = useState([0, 0]); // Initialize with [0, 0]
  const data=useData();
  useEffect(() => {
   
          const responses = data.map((row) => row['As-tu un permis B ?']);
          const ouiCount = responses.filter((response) => response === 'Oui').length;
          const nonCount = responses.filter((response) => response === 'Non').length;

          
          setPieChartData([ouiCount, nonCount]);    
      }, [data]);

  useEffect(() => {
    const canvas = document.getElementById('pie-chart');

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    const data = {
      labels: ['Oui', 'Non'],
      datasets: [
        {
          data: pieChartData,
          backgroundColor: ['green', 'red'],
        },
      ],
    };

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'pie', 
      data: data,
      options: {
        
      },
    });

    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [pieChartData]);

  return <div style={{ width: '500px', height: '500px' }}><canvas id="pie-chart" /></div>;
}

export default HistPermis;
