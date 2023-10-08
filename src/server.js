const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001; // Port for your proxy server

// Define a route to proxy the Google Sheets data
app.get('/google-sheets-data', async (req, res) => {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/your-spreadsheet-url', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Set appropriate CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.json(data);
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
