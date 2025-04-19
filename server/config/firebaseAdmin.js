// server/config/firebaseAdmin.js
const admin = require('firebase-admin');
const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase Admin SDK with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore(); // Firestore database instance (you can add other services as needed)
const auth = admin.auth(); // Firebase Admin authentication instance

module.exports = { admin, db, auth };
