import { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

// Create a context
const DataContext = createContext();

// Create a custom hook to access the context
export function useData() {
  return useContext(DataContext);
}

// Data provider component
export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS65hgo4JlFyIrIzQdpPaLiaUMZw9VfC7aHbWlbQXw7WIfeBRD6jEJkf6LfADiXjZcXdGNP7c6XgCTB/pub?gid=610042587&single=true&output=csv', // Replace with your CSV file URL
      {
        download: true,
        header: true,
        complete: (result) => {
          setData(result.data);
        },
      }
    );
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}
