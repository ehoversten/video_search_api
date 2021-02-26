import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

import axios from 'axios';

// Styles
import classes from './Signup.module.css';

// Bootstrap Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignUp() {
  const history = useHistory();

  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const { first, last, username, email, password, passwordCheck } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === '' || passwordCheck === '') {
      console.log('Missing form information');
      return;
    }

    if (password !== passwordCheck) {
      console.error('Passwords do not Match');
    }

    //-- TESTING --//
    console.log('Submitting');
    console.log(formData);

    //-- create temp user
    const user = {
      first,
      last,
      username,
      email,
      password,
      passwordCheck,
    };

    //-- Send to Server Route
    try {
      //-- Create 'config' for sending headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      //-- Stringify User Input
      const body = JSON.stringify(user);

      const res = await axios.post('/users/register', body, config);
      //-- TESTING --//
      console.log(res.data);

      await getLoggedIn();

      // if(res) {
      //   localStorage.setItem('x-auth-token', res.data.token);

      //   setUserData({
      //     token: res.data.token,
      //     user: res.data.user
      //   })
      // }

      //-- Clear input -- //
      setFormData({
        first: '',
        last: '',
        username: '',
        email: '',
        password: '',
        passwordCheck: '',
      });

      history.push('/users');
      //-- Update toDashboard State
      // alert('Finished!');
    } catch (err) {
      console.error(err.response.data);
      // res.status(500).json(err);
    }
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={10} md={8} lg={6} className={classes.Column}>
        <p className={classes.FormTitle}>Welcome! Register</p>
        <Form autoComplete='on' onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId='formGroupEmail'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              onChange={onChangeHandler}
              name='first'
              value={first}
            />
          </Form.Group>
          <Form.Group controlId='formGroupEmail'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              onChange={onChangeHandler}
              name='last'
              value={last}
            />
          </Form.Group>
          <Form.Group controlId='formGroupEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder=''
              onChange={onChangeHandler}
              name='username'
              value={username}
            />
          </Form.Group>
          <Form.Group controlId='formGroupEmail'>
            <Form.Label>Email</Form.Label>
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
  );
}
