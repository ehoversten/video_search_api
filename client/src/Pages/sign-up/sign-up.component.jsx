import React, { useState } from 'react';
import axios from 'axios';

//Material ui

export default function SignUp() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const { first, last, username, email, password, passwordCheck } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
      passwordCheck
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
      <h1 className='welcome'>Welcome, Register!</h1>
      <form className='register' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='First Name'
            name='first'
            value={first}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Last Name'
            name='last'
            value={last}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordCheck'
            value={passwordCheck}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
