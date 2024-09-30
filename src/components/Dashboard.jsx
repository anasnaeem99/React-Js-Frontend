// src/components/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/', { replace: true });  // Prevent going back to dashboard
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col text-center">
                    <h1 className="mb-4">Welcome, {user?.name}</h1>
                    {/* Link to Blog Page */}
                    <Link to="/blog" className="btn btn-success">
                        Go to Blog Page
                    </Link><br></br><br></br>
                    <button onClick={handleLogout} className="btn btn-danger mb-3">Logout</button>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
