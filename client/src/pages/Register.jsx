import React, { useState } from 'react';
import axios from 'axios';

// component imports
import Navbar from '../components/Navbar';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { email, password });
      console.log('User registered:', response.data);
      // Handle successful registration (redirect to login or home)
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
     <Navbar />
      <h2 style={{ textAlign: 'center', color: 'purple', fontSize: '60pt',  fontFamily: '"Tagesschrift", system-ui' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
