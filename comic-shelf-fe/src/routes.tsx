import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import LoginModal from './shared/layout/home/login-modal';
import Logout from './shared/layout/home/logout';
// import RegisterModal from './shared/layout/home/register-modal';
import Home from './shared/layout/home/home';
// import ConnectPage from './shared/auth/connect/connect-page';

import Character from 'src/entities/character/character';
import Series from 'src/entities/series/series';
// import SeriesModal from 'src/entities/series/series-modal';

const MyRoutes = () => (
  <div id='route-container'>
    <Routes>
      <Route path="/">
        <Home />
      </Route>
      {/* <Route exact path={['/home', '/home/series/:id', '/login', '/register']}>
        <Home />
      </Route> */}
      <Route path='/logout'>
        <Logout />
      </Route>
      {/* <Route path='/connect/:provider'>
        <ConnectPage />
      </Route> */}
      <Route path='/characters'>
        <Character />
      </Route>
      <Route path='/series'>
        <Series />
      </Route>
    </Routes>
  </div>
);

export default MyRoutes;
