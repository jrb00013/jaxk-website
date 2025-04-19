import logo from './assets/images/logo.svg';
import jaxklogo from './assets/images/jaxklogo.png';
import clairelogo from './assets/images/cute.jpg';
import './styles/App.css';
import './styles/styles.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { 
  createData, 
  getAllData, 
  getDataById, 
  updateData, 
  deleteData 
} from './api/firebaseApi';

function App() {
  const [data, setData] = useState([]);  // ensure data is always an array
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    axios.get('/api/ping')
      .then(response => {
        if (response.data.message) {
          console.log(response.data.message);  // You can use this message for logging or UI
          // Handle accordingly if you expect a specific structure
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch data from Firebase
  const fetchData = async () => {
    try {
      const allData = await getAllData();
      if (Array.isArray(allData)) {
        setData(allData);
      } else {
        console.error('Failed to fetch data: Data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateData(editingId, formData);
        setEditingId(null);
      } else {
        await createData(formData);
      }
      setFormData({ title: '', content: '' });
      fetchData();  // Refresh data after submit
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, content: item.content });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      fetchData();  // Refresh data after delete
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  return (
    <div className="app">
      <h1 className ="JaxK">JaxK Design Corp.</h1>
      <h2 style={{textAlign: 'center', color: 'purple',fontSize: "36pt"}}>  Electrical Manufacturing Projects </h2>
      <h3 style={{textAlign: 'center', color: 'purple', fontSize: "30pt"}}> Welcome!</h3>
      <p className="Claire"> UI designed by Claire Hudson and implemented by Joe Black</p>
      <img src={jaxklogo} alt="JaxK Logo" className = "JaxKLogo" />
      <img src={jaxklogo} alt="JaxK Logo" className = "JaxKLogo2" />
      <img src={clairelogo} alt="Claire Logo" />
      <img src={logo} alt="Logo" />
      <img src={jaxklogo} alt="JaxK Logo" className = "JaxKLogo" />
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <button type="submit">
          {editingId ? 'Update' : 'Create'}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setFormData({ title: '', content: '' });
            setEditingId(null);
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="data-list">
        <h2>Data Items</h2>
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul>
            {data.map(item => (
              <li key={item.id} className="data-item">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <div className="actions">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
