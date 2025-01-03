import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ContactList from './components/Contacts/ContactList';
import TaskManager from './components/Tasks/TaskManager';
import Settings from './components/Settings';
import SignIn from './components/SignIn'; // Import the SignIn component
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status from localStorage on initial load
  useEffect(() => {
    const authState = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (authState) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logging out
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove authentication state
    setIsAuthenticated(false); // Update local state
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />} {/* Show Header only if authenticated */}
      <div className="container">
        <Routes>
          {/* If user is authenticated, redirect from /signin to /dashboard */}
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected routes for authenticated users */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Default redirect to dashboard */}
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" />} /> // Redirect all unauthenticated users to Sign-In
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
