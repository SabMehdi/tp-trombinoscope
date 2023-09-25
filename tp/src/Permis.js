import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

function HistPermis() {
  const [chart, setChart] = useState(null);
  const [pieChartData, setPieChartData] = useState([0, 0]); // Initialize with [0, 0]

  useEffect(() => {
    // Fetch and parse the CSV data
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS65hgo4JlFyIrIzQdpPaLiaUMZw9VfC7aHbWlbQXw7WIfeBRD6jEJkf6LfADiXjZcXdGNP7c6XgCTB/pub?output=csv',
      {
        download: true,
        header: true,
        complete: (result) => {
          // Extract the data you want to calculate for the pie chart
          const responses = result.data.map((row) => row['As-tu un permis B ?']);
          const ouiCount = responses.filter((response) => response === 'Oui').length;
          const nonCount = responses.filter((response) => response === 'Non').length;

          // Update the pie chart data
          setPieChartData([ouiCount, nonCount]);
        },
      }
    );
  }, []);

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
          backgroundColor: ['green', 'red'], // Define colors for each segment
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
