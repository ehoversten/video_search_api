import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

function DashboardComponent(props) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    // console.log(req.user);
    fetch('/users/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

      })
      .catch((err) => console.log(err));

  }, []);

  return loggedIn ? (
    <>
      <h1>Welcome Auth Dashboard User is authenticated</h1>
    </>
  ) : (
    <Redirect to={{ pathname: '/login'}} />
  );
}

export default DashboardComponent;
