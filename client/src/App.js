import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import UserContext from './Pages/context/userContext';
import axios from 'axios';

//Material Ui

import Homepage from './Pages/homepage/homepage.component';
import SignUp from './Pages/sign-up/sign-up.component';
import Login from './Pages/login/loginComponent';


function App() {
  // Define User Hook
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    // Define an ASYNC function to check for Token
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await axios.post("/api/verifyToken", null, 
        { 
          headers: { 'x-auth-token': token }
        });
      console.log(tokenRes);
    }
    // Invoke Function
    isLoggedIn();
  }, []);

  return (
    <div className='App'>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
