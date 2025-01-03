import React, { useState } from 'react';
import './SignIn.css'; // Import SignIn-specific styles

const SignIn = ({ setIsAuthenticated }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();

    // Hardcoded credentials for the example
    if (userId === 'admin' && password === 'password') {
      setIsAuthenticated(true); // Update authentication state
      localStorage.setItem('isAuthenticated', true); // Store authentication state in localStorage
    } else {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
