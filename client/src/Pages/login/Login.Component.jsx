import React, { useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import userContext from '../../contexts/userContext';
import AuthContext from '../../contexts/authContext';

// Styles
import classes from './Login.module.css';

// Bootstrap Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login(props) {
  // Bring in the User Context so we can update on submission
  const history = useHistory();
  const { setUserData } = useContext(userContext);
  const { getLoggedIn } = useContext(AuthContext);

  // Form Hooks
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [values, setValues] = useState({
    amount: '',
    password: '',
    showPassword: false,
    showDashboard: false,
  });

  const { email, password, passwordCheck } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password === '' || passwordCheck === '') {
      console.log('Missing form information');
      return;
    }
    if (password !== passwordCheck) {
      console.error('Passwords do not Match');
    }

    //-- Send to Server Route
    try {
      let authorized = await axios.post('/users/login', { email, password });
      // -- TESTING -- //
      console.log(`Authorized:`);
      console.log(authorized);

      await getLoggedIn();

      // if(authorized) {
      //   localStorage.setItem('x-auth-token', authorized.data.token);

      //   setUserData({
      //     token: authorized.data.token,
      //     user: authorized.data.user
      //   })
      // }

      //-- Clear inputs
      setFormData({
        email: '',
        password: '',
        passwordCheck: '',
      });

      // Redirect to Another Component
      history.push('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={`${classes.formContainer} `}>
      <Row className='justify-content-center'>
        <Col xs={10} md={8} lg={6} className={classes.Column}>
          <p className={classes.FormTitle}>Welcome! Register</p>
          <Form autoComplete='on' onSubmit={onSubmit}>
            <Form.Group controlId='formGroupEmail'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='email'
                placeholder=''
                onChange={onChangeHandler}
                name='email'
                value={email}
              />
            </Form.Group>
            <Form.Group controlId='formGroupPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder=''
                onChange={onChangeHandler}
                name='password'
                value={password}
              />
            </Form.Group>
            <Form.Group controlId='formGroupPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder=''
                onChange={onChangeHandler}
                name='passwordCheck'
                value={passwordCheck}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
