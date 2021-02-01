import React, { useState } from 'react';
import axios from 'axios';

//Styles
import useStyles from './sign-up.styles';

//Material ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

export default function SignUp(props) {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    showPassword: false,
  });

  const classes = useStyles(props);
  const { first, last, username, email, password, passwordCheck } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === '' || passwordCheck === '') {
      console.log('Missing form information');
      return
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
      };
      //-- Stringify User Input
      const body = JSON.stringify(user);

      console.log(body);
      const res = await axios.post('/users/register', body, config);
      //-- TESTING --//
      console.log(res.data);

      //-- Clear inputs
      setFormData({
        first: '',
        last: '',
        username: '',
        email: '',
        password: '',
        passwordCheck: '',
      });
      //-- Update toDashboard State
      alert('Finised!');
    } catch (err) {
      console.error(err.response.data);
      // res.status(500).json(err);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline>
        <Container
          maxWidth='sm'
          className={`${classes.container} register-form`}
        >
          <Paper className={`${classes.paperContainer}`}>
            <Typography variant='h4' component='h4' gutterBottom>
              Welcome Register!
            </Typography>

            <form
              className={`${classes.form}`}
              autoComplete='on'
              onSubmit={(e) => onSubmit(e)}
            >
              <FormControl
                fullWidth
                margin='dense'
                className={`${classes.formControl}`}
              >
                <TextField
               
                  id='outlined-basic'
                  label='First Name'
                  variant='outlined'
                  onChange={onChangeHandler}
                  defaultValue={first}
                  name='first'
                />
              </FormControl>

              <FormControl
                fullWidth
                margin='dense'
                className={`${classes.formControl}`}
              >
                <TextField
                  id='outlined-basic'
                  label='Last Name'
                  variant='outlined'
                  onChange={onChangeHandler}
                  defaultValue={last}
                  name='last'
                />
              </FormControl>

              <FormControl
                fullWidth
                margin='dense'
                className={`${classes.formControl}`}
              >
                <TextField
                  id='outlined-basic'
                  label='Username'
                  variant='outlined'
                  onChange={onChangeHandler}
                  defaultValue={username}
                  name='username'
                />
              </FormControl>

              <FormControl
                fullWidth
                margin='dense'
                className={`${classes.formControl}`}
              >
                <TextField
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  onChange={onChangeHandler}
                  defaultValue={email}
                  name='email'
                />
              </FormControl>

              <FormControl
                fullWidth
                variant='outlined'
                className={`${classes.formControl} ${classes.customMargin}`}
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={onChangeHandler}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormControl
                fullWidth
                margin='dense'
                className={`${classes.formControl}`}
              >
                <TextField
                  id='outlined-basic'
                  label='Confirm Password'
                  type='password'
                  variant='outlined'
                  onChange={onChangeHandler}
                  defaultValue={passwordCheck}
                  name='passwordCheck'
                />
              </FormControl>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                type='submit'
                className={classes.customMargin}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
}
