import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useData } from './DataContext';

function HistogramAgeAndQuality() {
  const [chart, setChart] = useState(null);
  const [histogramData, setHistogramData] = useState([]);
  const data = useData();

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
      '10-20': {},
      '20-30': {},
      '30-40': {},
      '40-50': {},
      '50-60': {},
      '60+': {},
    };

    const choices = [
      'Look et design',
      'Performance',
      'Prix',
      'Endurance',
      'Conservation de la valeur',
      'Economie de consomation d\'energie',
    ];

    histogramData.forEach((age, index) => {
      if (age >= 10 && age < 20) {
        ageRanges['10-20'][index] = data[index]['Quelles sont les critères les plus importantes dans une voiture pour vous ?'];
      } else if (age >= 20 && age < 30) {
        ageRanges['20-30'][index] = data[index]['Quelles sont les critères les plus importantes dans une voiture pour vous ?'];
      } else if (age >= 30 && age < 40) {
        ageRanges['30-40'][index] = data[index]['Quelles sont les critères les plus importantes dans une voiture pour vous ?'];
      } else if (age >= 40 && age < 50) {
        ageRanges['40-50'][index] = data[index]['Quelles sont les critères les plus importantes dans une voiture pour vous ?'];
      } else if (age >= 50 && age < 60) {
        ageRanges['50-60'][index] = data[index]['Quelles sont les critères les plus importantes dans une voiture pour vous ?'];
      } else {
        ageRanges['60+'][index] = data[index]['Quelles sont les critères les plus importantes dans une voiture pour vous ?'];
      }
    });

    const ageRangeLabels = Object.keys(ageRanges);
    const datasets = choices.map((choice) => ({
      label: choice,
      data: ageRangeLabels.map((ageRange) => Object.values(ageRanges[ageRange]).filter((value) => value === choice).length),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }));

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ageRangeLabels,
        datasets: datasets,
      },
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

export default HistogramAgeAndQuality;
