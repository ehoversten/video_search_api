import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../../contexts/userContext';
import AuthContext from '../../contexts/authContext';
import LogOutBtn from '../auth/LogoutBtn' ;


function DashboardComponent(props) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { userData } = useContext(userContext);
    const history = useHistory();

    useEffect(() => {
        console.log(userData);
        // console.log(req.user);
        fetch('/users/')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(data.username);
                console.log(data.email);
            })
            .catch(err => console.log(err));


        // if(!userData.user) {
        //     history.push('/login');
        // }  else {
        //     setIsLoggedIn(true);
        // }

    }, []);

    return loggedIn ? 
        (
            <>
                <h1>Welcome Auth Dashboard</h1>
                <LogOutBtn />
            </>        
        ) : ( <h1>Welcome Auth Dash</h1> )
}


export default DashboardComponent;