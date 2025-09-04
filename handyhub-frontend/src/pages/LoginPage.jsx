// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    AuthService.login(email, password).then(
      () => {
        navigate('/'); // Navigate to home on successful login
        window.location.reload(); // Hard reload to ensure Navbar updates
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="auth-card"> {/* Assumes .auth-card is defined in App.css or index.css */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        {message && <div className="message">{message}</div>}
      </form>
      <div className="auth-link">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;