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
      let token = await localStorage.getItem("x-auth-token");
      console.log(`Token is: ${token}`);

      if(token === null) {
        localStorage.setItem('x-auth-token', '');
        console.log('setting empty token in local storage')
        token = '';
      }

      let tokenRes = await axios.post("/users/verify-token", null, 
        { 
          headers: { 'x-auth-token': token }
        });
      console.log(`Verify Token: ${tokenRes}`);
      console.log(`Verify Token: ${tokenRes.data}`);

      if(tokenRes.data) {
        const userRes = await axios.get("http://localhost:3001/users/", { headers: { 'x-auth-token': token }
        })
        console.log("Updating User");
        // Update User State
        setUserData({
          token: token,
          user: userRes.data
        });
      } else {
        console.log("No Token Data");
      }
    };
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
