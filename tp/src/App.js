import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Papa from 'papaparse';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const marques = [
  { nom: 'Toyota', image: 'https://logowik.com/content/uploads/images/toyota5075.logowik.com.webp' },
  { nom: 'Seat', image: 'https://logowik.com/content/uploads/images/seat-20173868.logowik.com.webp' },
  { nom: 'Hyundai', image: 'https://logowik.com/content/uploads/images/hyundai1362.jpg' },
  { nom: 'Porsche', image: 'https://logowik.com/content/uploads/images/porsche-new-20234989.logowik.com.webp' },
  { nom: 'BMW', image: 'https://logowik.com/content/uploads/images/bmw-flat9892.logowik.com.webp' },
  { nom: 'Citroen', image: 'https://logowik.com/content/uploads/images/728_citroen.jpg' },
  { nom: 'Renault', image: 'https://logodownload.org/wp-content/uploads/2014/09/renault-logo-0-1.png' },
  { nom: 'Mercedes', image: 'https://logowik.com/content/uploads/images/904_mercedesbenz.jpg' },
  { nom: 'Volkswagen', image: 'https://logowik.com/content/uploads/images/volkswagen7007.jpg' },
  { nom: 'Nissan', image: 'https://logowik.com/content/uploads/images/nissan-new2693.logowik.com.webp' },
  { nom: 'Tesla', image: 'https://logowik.com/content/uploads/images/tesla-t-symbol2343.logowik.com.webp' },
  { nom: 'Audi', image: 'https://logowik.com/content/uploads/images/audi-line-black5817.logowik.com.webp' },
  { nom: 'Opel', image: 'https://logowik.com/content/uploads/images/opel-new-20231625.logowik.com.webp' },
];

function App() {
  const [data, setData] = useState([]);
  const [personnes, setPersonnes] = useState([]);

  useEffect(() => {
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS65hgo4JlFyIrIzQdpPaLiaUMZw9VfC7aHbWlbQXw7WIfeBRD6jEJkf6LfADiXjZcXdGNP7c6XgCTB/pub?gid=610042587&single=true&output=csv',
      {
        download: true,
        header: true,
        complete: (result) => {
          setData(result.data);
          // Enregistrez les informations des personnes ici
          const personnesData = result.data.map((personData) => {
            const voitures = marques.filter((marque) =>
              personData['Quelles sont vos marques de voitures préferées ?'].includes(marque.nom)
            );
            return {
              nom: personData.Nom,
              prenom: personData.Prénom,
              voitures: voitures,
            };
          });
          setPersonnes(personnesData);
        },
      }
    );
  }, []);

  return (

   // Inside your component
<Slider>
  {personnes.map((personne, index) => (
    <div key={index}>
      <h2>{personne.prenom} {personne.nom}</h2>
      <Carousel>
        {personne.voitures.map((voiture, vIndex) => (
          <Carousel.Item key={vIndex}>
            <img src={voiture.image} alt={voiture.nom} className="d-block w-100" />
            <Carousel.Caption>
              <h3>{voiture.nom}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  ))}
</Slider>

    


  );
}

export default App;
