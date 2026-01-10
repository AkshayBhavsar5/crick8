// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './Store';
import { loadUserFromStorage } from './Store/User/userSlice';
import App from './App';

// Load user from localStorage on app start
store.dispatch(loadUserFromStorage());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
