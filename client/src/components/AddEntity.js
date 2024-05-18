import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/AddEntity.css';

const AddEntity = () => {
  const [entity, setEntity] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEntity({ ...entity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/entity', entity, { withCredentials: true })
      .then(res => {
        navigate('/');
      })
      .catch(err => {
        console.error('Error adding entity:', err);
        setError('Error adding entity');
      });
  };

  return (
    <div className="add-entity">
      <h2>Add New Entity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} value={entity.name} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={handleChange} value={entity.email} required />
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input type="text" id="mobile" name="mobile" onChange={handleChange} value={entity.mobile} required />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" onChange={handleChange} value={entity.dob} required />
        </div>
        <button type="submit" className="add-entity-button">Add Entity</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddEntity;
