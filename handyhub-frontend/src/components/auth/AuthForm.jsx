// src/components/auth/AuthForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css'; // Import the CSS file

const AuthForm = ({ title, fields, onSubmit, message, linkText, linkTo }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="auth-button">
            {title}
          </button>
          {message && <div className="message">{message}</div>}
        </form>
        <div className="auth-link">
          <Link to={linkTo}>{linkText}</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;