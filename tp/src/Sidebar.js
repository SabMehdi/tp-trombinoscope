// Sidebar.js
import React from 'react';
import './Sidebar.css'; // You can create a separate CSS file for styling
import { useState } from 'react';
function Sidebar() {
    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
    return (
      <div className="sidebar">
        <ul>
        <li >Acceuil</li>
          <li onClick={toggleDropdown}>Statistiques</li>
        </ul>
  
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>Age</li>              
              {/* Add more dropdown items as needed */}
            </ul>
          </div>
        )}
      </div>
    );}
export default Sidebar;
