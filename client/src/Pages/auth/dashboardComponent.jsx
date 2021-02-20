import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../../contexts/userContext';
import AuthContext from '../../contexts/authContext';


function DashboardComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { userData } = useContext(userContext);
    const history = useHistory();

    useEffect(() => {
        console.log(userData);
        // console.log(req.user);
        fetch('/users/')
            .then(res => res.json())
            .then(data => {
                if(data.username) {
                    setIsLoggedIn(true);
                }
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

    return isLoggedIn ? 
        (
            <>
                <h1>Welcome Auth Dashboard</h1>
                {/* <h4>{ userData.user.username }</h4> */}
                {/* { if(isLoggedIn) (
                    return <button>Logout</button>;
                 ) else (
                    return <button>Login</button>;
                 ) } */}
            </>        
        ) : ( <h1>Welcome Auth Dash</h1> )
}


export default DashboardComponent;