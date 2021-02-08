import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/userContext';

function DashboardComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log(userData);

        if(!userData.user) {
            history.push('/login');
        }  else {
            setIsLoggedIn(true);
        }

    }, []);

    return isLoggedIn ? 
        (
            <>
                <h1>Welcome Auth Dashboard</h1>
                <h4>{ userData.user.username }</h4>
            </>        
        ) : ( <h1>Welcome Auth Dash</h1> )
}


export default DashboardComponent;