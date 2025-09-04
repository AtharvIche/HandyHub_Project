// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AuthService from './services/auth.service';
import Navbar from "./components/Navbar"; // Corrected import path
import HomePage from './pages/HomePage';
import PostProblemPage from './pages/PostProblemPage';
import MyProblemsPage from './pages/MyProblemsPage';
import AllProblemsPage from './pages/AllProblemsPage';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import './App.css'; // Global App styles

function AppContent() {
  const location = useLocation();

  // Check if the current path is one of the authentication pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {/* Navbar only renders if not on an auth page */}
      {!isAuthPage && <Navbar />}

      {/* Apply auth-page class conditionally to the main content area */}
      <main className={isAuthPage ? 'auth-page' : 'main-content'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-problems" element={<ProtectedRoute><AllProblemsPage /></ProtectedRoute>} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/post-problem" element={<ProtectedRoute><PostProblemPage /></ProtectedRoute>} />
          <Route path="/my-problems" element={<ProtectedRoute><MyProblemsPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Add a catch-all route for 404 or redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;