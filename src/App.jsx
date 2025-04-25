import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Pages/Dashboard';

// This function checks if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null; // or any other way to check auth status
};

// Protected route component to prevent access to pages if not authenticated
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Note Editor Routes (if needed) */}
        {/* <Route path="/note/new" element={<NoteEditorPage />} /> */}
        {/* <Route path="/note/edit/:noteId" element={<NoteEditorPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
