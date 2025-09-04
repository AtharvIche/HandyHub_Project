import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from './HomePage';
import PostProblemPage from './PostProblemPage';
import MyProblemsPage from './MyProblemsPage';
import AllProblemsPage from './AllProblemsPage';
import ContactUsPage from './ContactUsPage';
import ProtectedRoute from '../components/ProtectedRoute';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-problems" element={<AllProblemsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route 
            path="/post-problem" 
            element={<ProtectedRoute><PostProblemPage /></ProtectedRoute>} 
          />
          <Route 
            path="/my-problems" 
            element={<ProtectedRoute><MyProblemsPage /></ProtectedRoute>} 
          />
        </Routes>
      </main>
    </>
  );
};

export default LandingPage;