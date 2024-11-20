const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

// Read the SSL certificate and key
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
};

// Serve React static files in production
app.use(express.static(path.join(__dirname, 'build')));

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, HTTPS world!');
});

// All other routes should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the HTTPS server
https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS Server running on https://localhost:3000');
});