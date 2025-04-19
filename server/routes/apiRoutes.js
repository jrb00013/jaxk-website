const express = require('express');
const router = express.Router();

// Define the API routes
router.get('/ping', (req, res) => {
  res.send('Pong');
});

router.get('/test', (req, res) => {
  res.send('API working!');
});

// No need for app.listen in this file, server.js handles it

module.exports = router;
