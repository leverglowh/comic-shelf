// import React, { useEffect, useState } from 'react';
// import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { Alert, Button, Form, Modal } from 'reactstrap';

// import { strapiUrl } from 'src/shared/reducers/api-urls';
// import { IRootState } from 'src/shared/reducers';
// import { login, resetMessages } from 'src/shared/reducers/authentication';
// import { saveItemToLocalStorage } from 'src/shared/util/general-utils';

// import './login.scss';

// export interface ILoginModalProps extends StateProps, DispatchProps, RouteComponentProps {}

// const LoginModal: React.FC<ILoginModalProps> = (props) => {
//   const [loginData, setLoginData] = useState({
//     username: '',
//     password: '',
//     rememberMe: true,
//   });
//   const [validated, setValidated] = useState(false);

//   const AUTH_TOKEN_KEY = 'mcread-authenticationToken';

//   useEffect(() => {
//     if (
//       sessionStorage.getItem('mcread-authenticationToken') !== null ||
//       localStorage.getItem('mcread-authenticationToken') !== null
//     ) {
//       props.history.push('/');
//     }

//     return () => {
//       props.resetMessages();
//     }
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.persist();
//     setValidated(false);
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.persist();
//     setLoginData({
//       ...loginData,
//       rememberMe: e.target.checked,
//     });
//   };

//   const handleClose = (event) => {
//     if (event) event.stopPropagation();
//     props.history.push('/');
//   };

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   useEffect(() => {
//     if (validated) {
//       const { username, password } = loginData;
//       if (!username || !password) return;
//       props.login(username, password);
//     }
//   }, [validated]);

//   const loginGoogle = () => {
//     window.location.href = strapiUrl + 'connect/google';
//   };

//   useEffect(() => {
//     if (props.loginSuccess) {
//       if (loginData.rememberMe) {
//         saveItemToLocalStorage(AUTH_TOKEN_KEY, props.idToken);
//       } else {
//         sessionStorage.setItem(AUTH_TOKEN_KEY, props.idToken);
//       }

//       setTimeout(() => handleClose(null), 1000);
//     }

//     if (props.loginError) {
//       setValidated(false);
//       setLoginData({
//         ...loginData,
//         username: '',
//         password: '',
//       });
//       document.getElementById('login-username')?.focus();
//     }
//   }, [props.loginError, props.loginSuccess]);

//   return (
//     <Modal show onHide={handleClose} backdrop id='login-modal' autoFocus={false}>
//       <Modal.Header id='login-title' closeButton>
//         <h5 style={{ margin: 0 }}>Login</h5>
//       </Modal.Header>
//       <Modal.Body>
//         <div className='pre-login-form'>
//           <div className='providers'>
//             <img
//               id='login-google'
//               onClick={loginGoogle}
//               style={{ width: 191, height: 46 }}
//               src={`${process.env.PUBLIC_URL}/providers/google.png`}
//               alt='login with google'
//             />
//           </div>
//           <div className='text-or'>or</div>
//         </div>
//         {props.loginError ? (
//           <Alert variant='danger'>
//             <strong>Login error</strong> Please check your credentials.
//           </Alert>
//         ) : props.loginSuccess ? (
//           <Alert variant='success'>
//             <strong>Login success!</strong>
//             <br />
//             Redirecting to homepage.
//           </Alert>
//         ) : null}
//         <Form id='login-form' noValidate validated={validated} onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Label htmlFor='login-username'>Username</Form.Label>
//             <Form.Control
//               autoFocus
//               required
//               name='username'
//               id='login-username'
//               placeholder='username'
//               value={loginData.username}
//               onChange={handleInputChange}
//             />
//             <Form.Control.Feedback type='invalid'>Must not be empty</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label htmlFor='login-password'>Password</Form.Label>
//             <Form.Control
//               required
//               type='password'
//               name='password'
//               id='login-password'
//               placeholder='password'
//               value={loginData.password}
//               onChange={handleInputChange}
//             />
//             <Form.Control.Feedback type='invalid'>Must not be empty</Form.Control.Feedback>
//           </Form.Group>
//         </Form>
//         <Form.Group>
//           <Form.Check
//             custom
//             id='login-remember-me'
//             label='Remember me'
//             name='rememberMe'
//             checked={loginData.rememberMe}
//             onChange={handleRememberMeChange}
//           />
//         </Form.Group>
//         {/*
//           <Alert color="warning">
//             <Link to="/reset/request">Hai dimenticato la tua password?</Link>
//           </Alert>
//           */}
//         <Alert variant='warning'>
//           <span>Not registered?</span> <Link to='/register'>Do it now!</Link>
//         </Alert>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button type='button' variant='secondary' onClick={handleClose} tabIndex={1} disabled={props.loginSuccess}>
//           Cancel
//         </Button>{' '}
//         <Button variant='primary' type='button' onClick={handleSubmit} disabled={props.loginSuccess}>
//           Login
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// const mapStateToProps = ({ authentication }: IRootState) => ({
//   idToken: authentication.idToken,
//   user: authentication.user,
//   loginError: authentication.loginError,
//   loginSuccess: authentication.loginSuccess,
// });

// const mapDispatchToProps = { login, resetMessages };

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModal));
