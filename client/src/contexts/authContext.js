import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

// Initialize a CONTEXT OBJECT
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await axios.get('/users/verify-token');
        console.log(loggedInRes);
        setLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthContextProvider };