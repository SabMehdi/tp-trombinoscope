import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
// Sidebar.js

// ... (your existing imports and code)

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

  // Function to handle the behavior of the Statistics submenu
  const toggleStatistics = () => {
    if (showDropdown1) {
      // Close the Statistics submenu
      setShowDropdown2(false);
      setShowDropdown3(false);
      setShowDropdown4(false);
      setShowDropdown5(false);
    }
    toggleDropdown1(); // Toggle the Statistics submenu
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Acceuil</Link>
        </li>
        <li onClick={toggleStatistics}> {/* Updated: Handle Statistics submenu */}
          Statistics
          {showDropdown1 ? (
            <span className="dropdown-icon">&#9650;</span>
          ) : (
            <span className="dropdown-icon">&#9660;</span>
          )}
        </li>
      </ul>

      {showDropdown1 && (
        <div className="dropdown with-dropdown">
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
                  <li>
                    <Link to="/mixed">age/criteres</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/nuages">Nuages age/budget</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
