import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Register.css'; // Import CSS file

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/login', values) // Corrected URL
            .then(res => {
                if (res.data.Status === "LoginSuccess") {
                    navigate('/');
                } else {
                    alert(res.data.Message);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="login-input" onChange={e => setValues({ ...values, email: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="login-input" onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
                <button type="submit" className="formButton">Login</button>

                {error && <p>Something went wrong!</p>}
                <Link to="/register">Don't have an account? Register here</Link>
                <br />
                <center>
                    <Link to="/">🏠</Link>
                </center>

            </form>
        </div>
    );
};

export default Login;
