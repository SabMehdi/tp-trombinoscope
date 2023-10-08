import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import { useData } from './DataContext';

function HistogramAge() {
  const [chart, setChart] = useState(null);
  const [histogramData, setHistogramData] = useState([]);
  const data=useData();
  useEffect(() => {
   
          const ages = data.map((row) => parseInt(row['Age'], 10)).filter((age) => !isNaN(age));
          setHistogramData(ages);
            
  }, [data]);

  useEffect(() => {
    const canvas = document.getElementById('histogram-chart');

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

   
    const ageRanges = {
      '10-20': 0,
      '20-30': 0,
      '30-40': 0,
      '40-50': 0,
      '50-60': 0,
      '60+': 0,
    };

    histogramData.forEach((age) => {
      if (age >= 10 && age < 20) {
        ageRanges['10-20'] += 1;
      } else if (age >= 20 && age < 30) {
        ageRanges['20-30'] += 1;
      } else if (age >= 30 && age < 40) {
        ageRanges['30-40'] += 1;
      } else if (age >= 40 && age < 50) {
        ageRanges['40-50'] += 1;
      } else if (age >= 50 && age < 60) {
        ageRanges['50-60'] += 1;
      } else {
        ageRanges['60+'] += 1;
      }
    });

    const ageRangeLabels = Object.keys(ageRanges);
    const participantCounts = Object.values(ageRanges);

    const data = {
      labels: ageRangeLabels,
      datasets: [
        {
          label: 'Age',
          data: participantCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            type: 'category', 
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });

    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [histogramData]);

  return <canvas id="histogram-chart" />;
}

export default HistogramAge;
