// src/Components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

// This function checks if the user is authenticated (has a valid token in localStorage)
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null; // or use your preferred auth mechanism
};

// ProtectedRoute component checks if user is authenticated before rendering the protected page
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
