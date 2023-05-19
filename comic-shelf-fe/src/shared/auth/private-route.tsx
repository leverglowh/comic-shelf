import React from 'react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line arrow-body-style
const PrivateRoute = (props) => {
  // const hemiOk = localStorage.getItem('hemi') !== null;
  // if (hemiOk) return <Route {...props} />;
  // else return <Redirect to='/' />;
  return <Route {...props} />;
};

export default PrivateRoute;
