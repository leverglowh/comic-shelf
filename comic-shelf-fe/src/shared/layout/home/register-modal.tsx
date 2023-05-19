// import React, { useEffect, useState } from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { connect } from 'react-redux';

// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

// import { IRootState } from 'src/shared/reducers';
// import { register, resetMessages } from 'src/shared/reducers/authentication';

// import './login.scss';
// import { AUTH_TOKEN_KEY } from 'src/config/constans';

// export interface IregisterModalProps extends StateProps, DispatchProps, RouteComponentProps {}

// const RegisterModal: React.FC<IregisterModalProps> = (props) => {
//   const [registerData, setregisterData] = useState({
//     username: '',
//     password: '',
//     email: '',
//   });
//   const [validated, setValidated] = useState(false);

//   useEffect(() => {
//     if (sessionStorage.getItem(AUTH_TOKEN_KEY) !== null || localStorage.getItem(AUTH_TOKEN_KEY) !== null) {
//       props.history.push('/');
//     }

//     return () => {
//       props.resetMessages();
//     }
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.persist();
//     setValidated(false);
//     setregisterData({
//       ...registerData,
//       [e.target.name]: e.target.value,
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
//       const { username, password, email } = registerData;
//       if (!username || !password || !email) return;
//       props.register(username, password, email);
//     }
//   }, [validated]);

//   useEffect(() => {
//     if (props.registerSuccess) {
//       sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(props.idToken));
//       setTimeout(() => handleClose(null), 1000);
//     }

//     if (props.registerError) {
//       setValidated(false);
//       setregisterData({
//         username: '',
//         password: '',
//         email: '',
//       });
//       document.getElementById('register-username')?.focus();
//     }
//   }, [props.registerError, props.registerSuccess]);

//   return (
//     <Modal show onHide={handleClose} id='register-modal' autoFocus={false}>
//       <Modal.Header id='register-title' closeButton>
//         Register
//       </Modal.Header>
//       <Modal.Body>
//         {props.registerError ? (
//           <Alert variant='danger'>
//             <strong>Register error</strong>
//           </Alert>
//         ) : props.registerSuccess ? (
//           <Alert variant='success'>
//             <strong>register success!</strong>
//             <br />
//             Redirecting to homepage.
//           </Alert>
//         ) : null}
//         <Form id='register-form' noValidate validated={validated} onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Label htmlFor='register-username'>Username</Form.Label>
//             <Form.Control
//               required
//               autoFocus
//               name='username'
//               id='register-username'
//               placeholder='username'
//               value={registerData.username}
//               onChange={handleInputChange}
//             />
//             <Form.Control.Feedback type='invalid'>Must not be empty</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label htmlFor='register-password'>Password</Form.Label>
//             <Form.Control
//               required
//               type='password'
//               name='password'
//               id='register-password'
//               placeholder='password'
//               value={registerData.password}
//               onChange={handleInputChange}
//             />
//             <Form.Control.Feedback type='invalid'>Must not be empty</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label htmlFor='register-email'>Email</Form.Label>
//             <Form.Control
//               required
//               type='email'
//               name='email'
//               id='register-email'
//               placeholder='email'
//               value={registerData.email}
//               onChange={handleInputChange}
//             />
//             <Form.Control.Feedback type='invalid'>Must not be empty</Form.Control.Feedback>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button type='button' variant='secondary' onClick={handleClose} tabIndex={1} disabled={props.registerSuccess}>
//           Cancel
//         </Button>{' '}
//         <Button variant='primary' type='button' onClick={handleSubmit} disabled={props.registerSuccess}>
//           Register
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// const mapStateToProps = ({ authentication }: IRootState) => ({
//   idToken: authentication.idToken,
//   user: authentication.user,
//   registerError: authentication.loginError,
//   registerSuccess: authentication.loginSuccess,
// });

// const mapDispatchToProps = { register, resetMessages };

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterModal));
