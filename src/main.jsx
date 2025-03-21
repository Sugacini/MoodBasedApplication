import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './components/style.css';
import Game from './components/Game.jsx';
import { ContextProvider } from './ForContext.jsx';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvider>
  <App />
  </ContextProvider>
)
