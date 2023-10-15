import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useData } from './DataContext';

function formatBudget(budget) {
    if (budget === "moins de 5000") {
      return 2500; 
    } else if (budget === "plus de 50000") {
      return 52500; 
    } else {
      
      const [min, max] = budget
        .split(' et ')
        .map((value) => parseInt(value.replace(/\D/g, ''), 10));
  
      return (min + max) / 2;
    }
  }
  

function ScatterPlot() {
  const data = useData();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const newChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Age et Budget',
              data: data.map((item) => ({
                x: parseInt(item.Age, 10),
                y: formatBudget(item["C'est quoi votre budget en euros?"]),
                
              })),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              pointRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Age',
              },
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Budget',
              },
            },
          },
        },
      });

      chartRef.current = newChart;
    }
  }, [data]);

  return <canvas ref={canvasRef} />;
}

export default ScatterPlot;
