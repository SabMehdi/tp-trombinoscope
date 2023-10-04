import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';

function Favorites() {
  const [chart, setChart] = useState(null);
  const [favoriteBrandsData, setFavoriteBrandsData] = useState({});

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

  useEffect(() => {
    const canvas = document.getElementById('brands-chart');
    
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    const brandLabels = Object.keys(favoriteBrandsData);
    const responseCounts = Object.values(favoriteBrandsData);

    const data = {
      labels: brandLabels,
      datasets: [
        {
          label: 'Les marques favoris',
          data: responseCounts,
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
  }, [favoriteBrandsData]);

  return <canvas id="brands-chart" />;
}

export default Favorites;