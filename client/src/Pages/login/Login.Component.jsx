import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/authContext';

// Styles
import classes from './Login.module.css';

// Bootstrap Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormInput from '../../components/form-input/Form-Input.component';

function Login(props) {
  // Bring in the User Context so we can update on submission
  const history = useHistory();

  const { getLoggedIn } = useContext(AuthContext);

  // Form Hooks
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    resError: '',
  });

  const { email, password, passwordCheck } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({
      formErrors,
      resError: '',
    });
    // Validation
    // if (password === '' || passwordCheck === '') {
    //   setFormErrors({
    //     ...formErrors,
    //     password: 'Missing form information',
    //     passwordCheck: 'Missing form information',
    //   });
    //   console.log('Missing form information');
    //   return;
    // }
    if (password !== passwordCheck) {
      setFormErrors({
        ...formErrors,
        password: 'Passwords do not Match',
        passwordCheck: 'Passwords do not Match',
      });
      return;
    }

    //-- Send to Server Route
    try {
      let authorized = await axios.post('/users/login', { email, password });
      // -- TESTING -- //
      console.log(`Authorized:`, authorized);

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
        resError: '',
      });

      // Redirect to Another Component
      // history.push('/users');
      history.push('/favorites');
    } catch (err) {
      setFormErrors({
        email: '',
        password: '',
        passwordCheck: '',
        resError: err.response.data.msg,
      });
    }
  };

  return (
    <Container className={`${classes.formContainer} `}>
      <Row className='justify-content-center'>
        <Col xs={10} md={8} lg={6} className={`${classes.Column} `}>
          <p className={classes.formTitle}>Welcome Back!</p>

          {formErrors.resError ? (
            <p className={classes.formError}>{formErrors.resError}</p>
          ) : null}

          <Form autoComplete='on' onSubmit={onSubmit}>
            <FormInput
              controlId='formGroupEmail'
              label='Email'
              type='email'
              placeholder=''
              onChangeHandler={onChangeHandler}
              name='email'
              value={email}
              errMessage={formErrors.password}
              required
            />

            <FormInput
              controlId='formGroupPassword'
              label='Password'
              type='password'
              placeholder=''
              onChangeHandler={onChangeHandler}
              name='password'
              value={password}
              errMessage={formErrors.password}
              isInvalid={formErrors.password}
              required
            />

            <FormInput
              controlId='formGroupPasswordCheck'
              label='Confirm Password'
              type='password'
              placeholder=''
              onChangeHandler={onChangeHandler}
              name='passwordCheck'
              errMessage={formErrors.passwordCheck}
              isInvalid={formErrors.passwordCheck}
              required
            />

            <Button
              type='submit'
              variant='primary'
              className={classes.submitBtn}
            >
              Submit
            </Button>

            <div className={classes.linkDiv}>
              <p>Not signed up? Register </p> <Link to='/signup'>here</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
