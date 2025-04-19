require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');
const apiRoutes = require('./routes/apiRoutes');

// Initialize Firebase Admin SDK
const serviceAccount = require('./jaxk-website-firebase-adminsdk-fbsvc-4461c645c4.json');  // Ensure you have the Firebase service account JSON
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const app = express();

// CORS configuration: Allow requests from localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173', // Allow this origin
  methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization',  // Allow these headers
};

// Middleware
app.use(cors(corsOptions));  // Use CORS with the specified options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








// was working at 4-19-25 at 1:53 am
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const apiRoutes = require('./routes/apiRoutes');

// const app = express();

// // CORS configuration: Allow requests from localhost:5173
// const corsOptions = {
//   origin: 'http://localhost:5173', // Allow this origin
//   methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
//   allowedHeaders: 'Content-Type,Authorization',  // Allow these headers
// };

// // Middleware
// app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(cors(corsOptions));  // Use CORS with the specified options
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/api/ping', (req, res) => {
//   res.json({ message: 'pong' });
// });


// // Routes
// app.use('/api', apiRoutes);

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
