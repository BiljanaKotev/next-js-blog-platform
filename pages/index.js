// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from '../pages/src/context/auth.context';

// Ensure that document is defined before creating the root
if (typeof document !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  );
}

// Exporting the component is missing in your original code
export default App;
