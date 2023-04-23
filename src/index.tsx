import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render( <Provider store={store}><App /></Provider>);
} else {
  console.error("Element with ID 'root' not found in the document.");
}
