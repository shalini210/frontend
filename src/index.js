import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the updated API
import App from './App'; // Your main App component
import './index.css'; // Your global styles
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

// Use createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
