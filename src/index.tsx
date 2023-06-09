import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import  {Provider} from 'react-redux'
import {BrowserRouter, Routes, Route, Navigate, useNavigate, useParams} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
        <Route  path="/*" element={ <App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);


