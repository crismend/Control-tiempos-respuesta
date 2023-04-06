import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Helmet} from "react-helmet"
import logo from "./Img/pazDelRio.png"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Helmet>
      <link rel='shortcut icon' href={logo} type='image/x-icon'/>
    </Helmet>
    <App />
  </React.StrictMode>
);


