
import React from 'react'
import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null
}

// Get the user's role from localStorage
const getUserRole = () => {
  return localStorage.getItem('role') // Expected: 'ADMIN' or 'USER'
}

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />
}

  const userRole = getUserRole()

  // If roles are restricted, check if user has access
  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />
  }

  return children;
}

export default ProtectedRoute;
