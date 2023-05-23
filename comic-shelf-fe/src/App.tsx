import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './routes';

import Header from './shared/layout/header/header';
import { loadIcons } from './config/icon-loader';
import { updateCache } from './shared/util/api-utils';
import { ToastContainer } from 'react-toastify';

import './App.scss';

function App() {
  useEffect(() => {
    updateCache();
  }, []);

  loadIcons();

  return (
    <div className='App'>
      <Router>
        <Header />
        <>
          <MyRoutes />
          <ToastContainer
            position='top-left'
            autoClose={2000}
            progressClassName="toast-progress"
            bodyClassName="toast-body"
          />
        </>
      </Router>
    </div>
  );
}

export default App;
