import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthProvider';
import './index.css'
import router from './routes/routes';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
