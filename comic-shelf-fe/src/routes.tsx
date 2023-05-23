import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './shared/layout/home/login';
import Logout from './shared/layout/home/logout';
// import RegisterModal from './shared/layout/home/register-modal';
import Home from './shared/layout/home/home';
// import ConnectPage from './shared/auth/connect/connect-page';

import Series from 'src/entities/series/series';
// import SeriesModal from 'src/entities/series/series-modal';

const MyRoutes = () => (
  <div id='route-container'>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route exact path={['/home', '/home/series/:id', '/login', '/register']}>
        <Home />
      </Route> */}
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      {/* <Route path='/connect/:provider'>
        <ConnectPage />
      </Route> */}
      <Route path='/series' element={<Series />} />
    </Routes>
  </div>
);

export default MyRoutes;
