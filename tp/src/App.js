import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Papa from 'papaparse';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'

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
              email: personData.Email,
              voitures: voitures,
            };
          });
          setPersonnes(personnesData);
        },
      }
    );
  }, []);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,


  };

  return (
    <Container>
      <h1>Trombinoscope</h1>
      {/* Affichez les informations des personnes ici */}
      <div className='grids'>
        {personnes.map((personne, index) => (
          <div className='test'>

            <div className='slider-col' >
              <h2 style={{ textAlign: 'center' }}>
                <span style={{fontWeight:'bold'}}>{personne.nom}</span>{personne.prenom}
              </h2>
              {/* Affichez les voitures préférées en un slider */}
              <Slider {...sliderSettings} >
                {personne.voitures.map((voiture, index) => (
                  <div key={index}>
                    {/* Apply custom CSS to control image size */}
                    <img
                      src={voiture.image}
                      alt={voiture.nom}
                      style={{ maxWidth: '100px', maxHeight: '100px', height: '50px', display: 'block', margin: '0 auto' }}
                    />
                    {/* {<p>{voiture.nom}</p> } */}
                  </div>
                ))}
              </Slider>
            </div>

            <div className='email-row'>
              {personne.email}
            </div>

          </div>

        ))}
      </div>
    </Container>

  );

}

export default App;
