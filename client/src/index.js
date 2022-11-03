import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import router  from './routes/routes'
import {
  RouterProvider,
} from "react-router-dom"
import {Provider} from 'react-redux'
import store from './store/index';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>
);

reportWebVitals();
