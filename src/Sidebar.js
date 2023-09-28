import React, { useState } from 'react';
import './Sidebar.css'; 
import { Link } from 'react-router-dom';
function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="sidebar">
      <ul>
        <li> <Link to="/">Acceuil</Link></li>
        <li onClick={toggleDropdown} >
          Statistics
          {showDropdown ? (
            <span className="dropdown-icon">&#9650;</span>
          ) : (
            <span className="dropdown-icon">&#9660;</span>
          )}
        </li>
      </ul>

      {showDropdown && (
        <div className="dropdown">
          <ul>
            <li> <Link to={"/histo"}>Age</Link></li>
          </ul>
          <ul>
            <li> <Link to={"/permis"}>Permis</Link></li>
          </ul>
          <ul>
            <li> <Link to={"/favs"}>Favoris</Link></li>
          </ul>
          <ul>
            <li> <Link to={"/crit"}>Criteres</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
