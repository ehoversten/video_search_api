import React, { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';

function LogoutButton(props) {
  const history = useHistory();
  const { getLoggedIn } = useContext(AuthContext);
  async function logOut() {
    await axios.get('/users/logout');
    await getLoggedIn();
    history.push('/');
  }

  return (
    <button className='btn btn-danger' onClick={logOut}>
      Logout
    </button>
  );
}

export default LogoutButton;
