import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Alert, Button,
  Form, FormGroup, FormFeedback,
  Label, Input
} from 'reactstrap';

import { strapiUrl } from 'src/shared/reducers/api-urls';
import { login, resetMessages } from 'src/shared/reducers/authentication';
import { saveItemToLocalStorage } from 'src/shared/util/general-utils';
import { useAppDispatch, useAppSelector } from 'src/shared/reducers/hooks';

import './login.scss';

const Login: React.FC = () => {
  const idToken = useAppSelector((state) => state.authentication.idToken);
  const loginError = useAppSelector((state) => state.authentication.loginError);
  const loginSuccess = useAppSelector((state) => state.authentication.loginSuccess);

  const dispatch = useAppDispatch();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    rememberMe: true,
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const AUTH_TOKEN_KEY = 'comic-shelf-authenticationToken';

  useEffect(() => {
    if (
      sessionStorage.getItem('mcread-authenticationToken') !== null ||
      localStorage.getItem('mcread-authenticationToken') !== null
    ) {
      navigate('/');
    }

    return () => {
      resetMessages();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setValidated(false);
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setLoginData({
      ...loginData,
      rememberMe: e.target.checked,
    });
  };

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    navigate('/');
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    if (validated) {
      const { username, password } = loginData;
      if (!username || !password) return;
      login(username, password);
    }
  }, [validated]);

  const loginGoogle = () => {
    window.location.href = strapiUrl + 'connect/google';
  };

  useEffect(() => {
    if (loginSuccess) {
      if (loginData.rememberMe) {
        saveItemToLocalStorage(AUTH_TOKEN_KEY, idToken);
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, idToken);
      }

      setTimeout(() => handleClose(null), 1000);
    }

    if (loginError) {
      setValidated(false);
      setLoginData({
        ...loginData,
        username: '',
        password: '',
      });
      document.getElementById('login-username')?.focus();
    }
  }, [loginError, loginSuccess]);

  return (
    <div id='login' autoFocus={false}>
      <h1 style={{ margin: 0 }}>Login</h1>
      <div>
        <div className='pre-login-form'>
          <div className='providers'>
            <img
              id='login-google'
              onClick={loginGoogle}
              style={{ width: 191, height: 46 }}
              src={`${process.env.PUBLIC_URL}/providers/google.png`}
              alt='login with google'
            />
          </div>
          <div className='text-or'>or</div>
        </div>
        {loginError ? (
          <Alert variant='danger'>
            <strong>Login error</strong> Please check your credentials.
          </Alert>
        ) : loginSuccess ? (
          <Alert variant='success'>
            <strong>Login success!</strong>
            <br />
            Redirecting to homepage.
          </Alert>
        ) : null}
        <Form id='login-form' noValidate validated={validated ? "true" : undefined} onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor='login-username'>Username</Label>
            <Input
              type='text'
              autoFocus
              required
              name='username'
              id='login-username'
              placeholder='username'
              value={loginData.username}
              onChange={handleInputChange}
            />
            <FormFeedback type='invalid'>Must not be empty</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='login-password'>Password</Label>
            <Input
              required
              type='password'
              name='password'
              id='login-password'
              placeholder='password'
              value={loginData.password}
              onChange={handleInputChange}
            />
            <FormFeedback type='invalid'>Must not be empty</FormFeedback>
          </FormGroup>
        </Form>
        <FormGroup>
          <Input
            type='checkbox'
            id='login-remember-me'
            label='Remember me'
            name='rememberMe'
            checked={loginData.rememberMe}
            onChange={handleRememberMeChange}
          />
        </FormGroup>
        {/*
          <Alert color="warning">
            <Link to="/reset/request">Hai dimenticato la tua password?</Link>
          </Alert>
          */}
        <Alert variant='warning'>
          <span>Not registered?</span> <Link to='/register'>Do it now!</Link>
        </Alert>
      </div>
      <div>
        <Button type='button' variant='secondary' onClick={handleClose} tabIndex={1} disabled={loginSuccess}>
          Cancel
        </Button>{' '}
        <Button variant='primary' type='button' onClick={handleSubmit} disabled={loginSuccess}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
