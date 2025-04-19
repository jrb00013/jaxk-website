const admin = require('firebase-admin');
const firebaseConfig = require('../config/firebaseConfig');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
const dataRef = db.ref('data');

module.exports = {
  async create(data) {
    const newDataRef = dataRef.push();
    await newDataRef.set(data);
    return { id: newDataRef.key, ...data };
  },

  async getAll() {
    const snapshot = await dataRef.once('value');
    const data = snapshot.val();
    return data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
  },

  async getById(id) {
    const snapshot = await dataRef.child(id).once('value');
    const data = snapshot.val();
    return data ? { id, ...data } : null;
  },

  async update(id, newData) {
    const dataSnapshot = await dataRef.child(id).once('value');
    if (!dataSnapshot.exists()) {
      return null;
    }
    await dataRef.child(id).update(newData);
    return { id, ...newData };
  },

  async delete(id) {
    const dataSnapshot = await dataRef.child(id).once('value');
    if (!dataSnapshot.exists()) {
      return null;
    }
    await dataRef.child(id).remove();
    return { id };
  }
};