import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import axios from 'axios';

function LogOutBtn() {
    const { getLoggedIn } = useContext(AuthContext)

    async function logOut() {
        await axios.get('/users/logout');
        getLoggedIn();
    }

    return (
        <button className="btn btn-warning" onClick={logout}>Logout</button>
    )
}

export default LogOutBtn;