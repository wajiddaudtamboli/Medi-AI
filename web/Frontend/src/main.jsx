import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { persistReduxStore } from './store';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <Provider store={persistReduxStore}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);