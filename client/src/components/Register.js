import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Register.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/register', user);
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div>
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <button type="submit" className="formButton">Register</button>
        {error && <p>Something went wrong!</p>}
        <Link to="/login">Already have an account? Log in</Link>
        <center>
          <Link to="/">🏠</Link>
        </center>
      </form>
    </div>
  );
};

export default Register;
