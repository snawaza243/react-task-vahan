import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Home.css';
import axios from 'axios';


const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          fetchEntities(res.data.userId);
        } else {
          setMessage(res.data.Message);
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setMessage(' ');
      });
  }, []);

  const fetchEntities = (userId) => {
    axios.get('http://localhost:8081/entities', { withCredentials: true })
      .then(res => {
        setEntities(res.data);

      })
      .catch(err => {
        console.error('Error fetching entities:', err);
      });
  };

  const handleLogout = () => {
    axios.post('http://localhost:8081/logout', {}, { withCredentials: true })
      .then(res => {
        if (res.data.Status === "LogoutSuccess") {
          setAuth(false);
          setName('');
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Error logging out:', err);
        setMessage('Error logging out');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/entity/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.Message === "Entity deleted successfully") {
          setEntities(entities.filter(entity => entity.id !== id));
        }
      })
      .catch(err => {
        console.error('Error deleting entity:', err);
      });
  };

  // Function to format date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract date portion
  };

  return (
    <div className="entity-list">
      <h2>Welcome {name}!</h2>
      {
        auth ? (
          <div>
            <div className="button-container">
              <button className="home-button" onClick={() => navigate('/add-entity')}>Add Entity</button>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <h3>Person Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entities.map(entity => (
                  <tr key={entity.id}>
                    <td>{entity.name}</td>
                    <td>{entity.email}</td>
                    <td>{entity.mobile}</td>
                    <td>{formatDate(entity.dob)}</td>
                    <td>
                      {/* <button className='edit-button' onClick={() => navigate(`/edit/${entity.id}`)}>Edit</button> */}
                      <button className='edit-button' onClick={() => navigate(`/edit/${entity.id}`, { state: { entity } })}>Edit</button>

                      <button className='delete-button' onClick={() => handleDelete(entity.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ) : (
          <div className="button-container">
            <Link to="/login">
              <button className="home-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="home-button">Register</button>
            </Link>
          </div>
        )
      }
      <h3>{message}</h3>
    </div>
  );
};

export default Home;
