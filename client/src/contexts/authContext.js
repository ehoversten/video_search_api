import { useState, createContext, useEffect, useRef } from 'react';
import axios from 'axios';

// Initialize a CONTEXT OBJECT
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const runOnce = useRef(false);
  // --> not currently being implemented
  const getLocalAuthInfo = () => {
    const localExpiryAt = localStorage.getItem('expiresAt');
  };

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get('/users/verify-token', { headers: { 'content-type': 'application/json'}, withCredentials: true});
      console.log(`User logged in: ${loggedInRes.data}`);
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      console.log('getLoggedIn Error', error);
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    if(!runOnce.current) {
      console.log("Running Auth Context");
      runOnce.current = true;
      getLoggedIn();
    }

    return () => {

    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
