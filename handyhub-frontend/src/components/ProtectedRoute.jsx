import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoute = ({ children }) => {
  const user = AuthService.getCurrentUser();
  if (!user || !user.token) { // Ensure token also exists
    // User is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;