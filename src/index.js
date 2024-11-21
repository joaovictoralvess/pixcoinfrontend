import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from "./contexts/AuthContext";
import {BrowserRouter} from "react-router-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'react-notifications/lib/notifications.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </AuthContextProvider>
  </React.StrictMode>
);
