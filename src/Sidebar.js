import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showDropdown4, setShowDropdown4] = useState(false);
  const [showDropdown5, setShowDropdown5] = useState(false);

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  const toggleDropdown3 = () => {
    setShowDropdown3(!showDropdown3);
  };

  const toggleDropdown4 = () => {
    setShowDropdown4(!showDropdown4);
  };

  const toggleDropdown5 = () => {
    setShowDropdown5(!showDropdown5);
  };


  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Acceuil</Link>
        </li>
        <li onClick={toggleDropdown1}>
          Statistics
          {showDropdown1 ? (
            <span className="dropdown-icon">&#9650;</span>
          ) : (
            <span className="dropdown-icon">&#9660;</span>
          )}
        </li>
      </ul>

      {showDropdown1 && (
        <div className="dropdown">
          <ul>
            <li>
              <button onClick={toggleDropdown2}>Age</button>
              {showDropdown2 && (
                <ul>
                  <li>
                    <Link to="/histo">Histogram</Link>
                  </li>
                  <li>
                    <Link to="/ageD3">Histogram D3</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={toggleDropdown3}>Permis</button>
              {showDropdown3 && (
                <ul>
                  <li>
                    <Link to="/permis">Permis </Link>
                  </li>
                  <li>
                    <Link to="/permisD3">Permis D3</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={toggleDropdown4}>Favoris</button>
              {showDropdown4 && (
                <ul>
                  <li>
                    <Link to="/favs">Favoris</Link>
                  </li>
                  <li>
                    <Link to="/favorisD3">Favoris D3</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={toggleDropdown5}>Criteres</button>
              {showDropdown5 && (
                <ul>
                  <li>
                    <Link to="/crit">Criteres</Link>
                  </li>
                  <li>
                    <Link to="/critD3">criteres D3</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar; 
 

/*  import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Sidebar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (index) => {
    setActiveDropdown(index === activeDropdown ? null : index);
  };

  const renderDropdown = (index, title, links) => {
    const isActive = index === activeDropdown;

    return (
      <Card key={index}>
        <Accordion.Toggle
          as={Card.Header}
          eventKey={index.toString()}
          onClick={() => handleDropdownClick(index)}
          className={`d-flex justify-content-between align-items-center ${
            isActive ? 'active' : ''
          }`}
        >
          {title}
          <i className={`fas ${isActive ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index.toString()}>
          <Card.Body>
            <ul className="list-unstyled">
              {links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  const dropdownData = [
    {
      title: 'Statistics',
      links: [
        { label: 'Age', to: '/histo' },
        { label: 'Permis', to: '/permis' },
        { label: 'Favoris', to: '/favs' },
        { label: 'Criteres', to: '/crit' },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <Accordion defaultActiveKey="0">
        {dropdownData.map((dropdown, index) => renderDropdown(index, dropdown.title, dropdown.links))}
      </Accordion>
    </div>
  );
}

export default Sidebar;  */