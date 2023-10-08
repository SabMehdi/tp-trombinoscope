
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Home from './Home';
import Statistics from './HistoAge';
import Histogram from './HistoAge';
import HistPermis from './Permis';
import Favorites from './favorites';
import Criteres from './Criteres';
import AgeD3 from './AgeD3';
import CriteresD3 from './criteresD3';
import HistPermisD3 from './PermisD3';
import FavorisD3 from './favorisD3';
import { DataProvider } from './DataContext';
import Sidebar from './Sidebar';
import ScatterPlot from './NuagesPoints';

function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <Sidebar/>
        <Container style={{ marginLeft: '250px' }}>
          <h1 style={{ textAlign: 'center' }}>Trombinoscope</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/permis" element={<HistPermis />} />
            <Route path="/histo" element={<Histogram />} />
            <Route path="/favs" element={<Favorites />} />
            <Route path="/crit" element={<Criteres />} />
            <Route path="/ageD3" element={<AgeD3 />} />
            <Route path="/critD3" element={<CriteresD3 />} />
            <Route path="/permisD3" element={<HistPermisD3 />} />
            <Route path="/favorisD3" element={<FavorisD3 />} />
            <Route path="/nuages" element={< ScatterPlot/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;