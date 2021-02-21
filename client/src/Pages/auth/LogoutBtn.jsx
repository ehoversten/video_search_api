import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import axios from 'axios';

function LogOutBtn() {
    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext)

    async function logOut() {
        await axios.get('/users/logout');
        await getLoggedIn();
        history.push('/');
    }

    return (
        <button className="btn btn-warning" onClick={logOut}>Logout</button>
    )
}

export default LogOutBtn;