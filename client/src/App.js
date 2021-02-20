import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import userContext from './contexts/userContext';
import axios from 'axios';

// -- TESTING -- //
import AuthContext, { AuthContextProvider } from './contexts/authContext';

//Material Ui

import Homepage from './Pages/homepage/homepage.component';
import SignUp from './Pages/sign-up/sign-up.component';
import Login from './Pages/login/loginComponent';
import AuthDashboard from './Pages/auth/dashboardComponent';


function App() {
  // Define User Hook
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  // const { loggedIn, setLoggedIn } = useContext(AuthContextProvider);
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    // Define an ASYNC function to check for Token
    // const isLoggedIn = async () => {
    //   let token = await localStorage.getItem("x-auth-token");
    //   console.log(`Token is: ${token}`);

    //   if(token === null) {
    //     localStorage.setItem('x-auth-token', '');
    //     console.log('setting empty token in local storage')
    //     token = '';
    //   }

    //   let tokenRes = await axios.post("/users/verify-token", null, 
    //     { 
    //       headers: { 'x-auth-token': token }
    //     });
    //   console.log(`Verify Token: ${tokenRes}`);
    //   console.log(`Verify Token: ${tokenRes.data}`);

    //   if(tokenRes.data) {
    //     const userRes = await axios.get("/users", { headers: { 'x-auth-token': token }
    //     })
    //     // const userRes = await axios.get("http://localhost:3001/users/", { headers: { 'x-auth-token': token }
    //     // })
    //     console.log("Updating User");
    //     // Update User State
    //     setUserData({
    //       token: token,
    //       user: userRes.data
    //     });
    //   } else {
    //     console.log("No Token Data");
    //   }
    // };
    // // Invoke Function
    // isLoggedIn();
  }, []);

  return (
    <div className='App'>
      <userContext.Provider value={{ userData, setUserData }}>
        <AuthContextProvider value={{ loggedIn, setLoggedIn }}>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/users' component={AuthDashboard} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </AuthContextProvider>
      </userContext.Provider>
    </div>
  );
}

export default App;
