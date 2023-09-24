import React, { useState } from 'react';
import './Sidebar.css'; // You can create a separate CSS file for styling
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
          <Link to={"/statistics"}>Statistiques</Link>
          {showDropdown ? (
            <span className="dropdown-icon">&#9650;</span>
          ) : (
            <span className="dropdown-icon">&#9660;</span>
          )}
        </li>
      </ul>

      {showDropdown}
    </div>
  );
}

export default Sidebar;
