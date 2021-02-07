import React, { useState } from 'react';

//Styles
import useStyles from './login.styles';

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


function Login(props) {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [check, setCheck] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordCheck: '',
    });
    const [values, setValues] = useState({
        amount: '',
        password: '',
        showPassword: false,
    });

    const classes = useStyles(props);
    const { email, password, passwordCheck } = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onSubmit = (event) => {
        event.preventDefault();
        const userLogin = {
            email,
            password,
            passwordCheck
        }

        console.log(userLogin);
        console.log("Submitting ....")
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
              Login
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
                  name="password"
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

export default Login;