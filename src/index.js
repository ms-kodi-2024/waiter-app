import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

fetch('http://localhost:3131/api/tables')
  .then((response) => response.json())
  .then((tables) => {
    const initialState = { tables };
    const store = configureStore(initialState);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
          <App />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('Error fetching initial state:', error);
  });
