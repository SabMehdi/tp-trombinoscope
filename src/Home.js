import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import './App.css'
import { useData } from './DataContext';
// url convenable pour chaque marque
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

function Home() {
  const data = useData();

  const [showDetails, setShowDetails] = useState([]);
  const headers = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  const toggleDetails = (index) => {
    setShowDetails((prevState) => {
      const updatedShowDetails = [...prevState];
      updatedShowDetails[index] = !prevState[index];
      return updatedShowDetails;
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!data || data.length === 0) {
    return <div>Chargement...</div>;
  }
  const matchCarWithMarque = (carName) => {
    return marques.find((marque) => carName.toLowerCase().includes(marque.nom.toLowerCase()));
  };

  return (
    <div className='grids'>
      {data.map((personData, index) => (
        <div className='test' key={index}>
          <div className='slider-col'>
            <h2 style={{ textAlign: 'center' }}>
              {personData.Nom.toUpperCase()} {personData.Prénom.toLowerCase()}
            </h2>
            <Slider {...sliderSettings}>
              {personData['Quelles sont vos marques de voitures préferées ?']
                .split(', ')
                .map((carName, carIndex) => {
                  const matchedMarque = matchCarWithMarque(carName);
                  return (
                    <div key={carIndex}>
                      <img
                        src={matchedMarque ? matchedMarque.image : ''}
                        alt={carName}
                        style={{
                          maxWidth: '100px',
                          maxHeight: '100px',
                          height: '50px',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
          <div className='email-row'>{personData.Email}</div>
          <button onClick={() => toggleDetails(index)}>
            {showDetails[index] ? 'Masquer les détails' : 'Afficher les détails'}
          </button>
          {showDetails[index] && (
            <div className='additional-details'>
              <h3>Additional Details</h3>
              <p>Date D'inscription: {personData.Timestamp}</p>
              <p>Telephone: {personData['Numéro de téléphone']}</p>
              <p>Age: {personData.Age}</p>
              <p>
                <FontAwesomeIcon icon={faIdCard} /> Permis B: {personData['As-tu un permis B ?']}
              </p>
              <p>Voulez-vous acheter une voiture ?: {personData['Préfère tu proquerire une voiture éléctrique ?']}</p>
              <p>Préfère tu proquerire une voiture éléctrique ?: {personData['Préfère tu proquerire une voiture éléctrique ?']}</p>
              <p>Quelles sont les critères les plus importantes dans une voiture pour vous ?: {personData['Quelles sont les critères les plus importantes dans une voiture pour vous ?']}</p>
              <p>Veux-tu acheter une voiture d'occasion ?: {personData['Veux-tu acheter une voiture d\'occasion ?']}</p>
              <p>C'est quoi votre budget en euros?: {personData['C\'est quoi votre budget en euros?']}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
