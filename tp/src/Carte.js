// Carte.js
import React from 'react';
import { Card, Carousel } from 'react-bootstrap';

class Carte extends React.Component {
  render() {
    const { nom, prenom, voitures } = this.props.personne;

    return (
      <Card style={{ width: '18rem' }}>
        <Carousel>
          {voitures.map((voiture, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={voiture.image} alt={voiture.marque} />
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body>
          <Card.Title>{prenom} {nom}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default Carte;
