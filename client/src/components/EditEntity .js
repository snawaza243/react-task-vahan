import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/EditEntity.css';

const EditEntity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entity, setEntity] = useState({
        name: '',
        email: '',
        mobile: '',
        dob: ''
    });

    
    useEffect(() => {
        axios.get(`http://localhost:8081/entity/${id}`, { withCredentials: true })
            .then(res => {
                const { name, email, mobile, dob } = res.data[0];
                setEntity({ name, email, mobile, dob });
            })
            .catch(err => {
                console.error('Error fetching entity:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        setEntity({ ...entity, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/entity/${id}`, entity, { withCredentials: true })
            .then(res => {
                if (res.data.Message === "Entity updated successfully") {
                    navigate('/');
                } else {
                    alert(res.data.Message);
                }
            })
            .catch(err => {
                console.error('Error updating entity:', err);
                alert('Error updating entity');
            });
    };

    return (
        <div className="form-container">
            <h1>Edit Entity</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={entity.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={entity.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="mobile" name="mobile" value={entity.mobile} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth: </label>
                    <input type="date" id="dob" name="dob" value={entity.dob} onChange={handleChange} />
                </div>
                <button type="submit" className="formButton">Save</button>
                <button type="button" className="cancelButton" onClick={()=>  navigate(-1)}>Cancel</button>

            </form>
        </div>
    );
};

export default EditEntity;
