import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

// Initialize a CONTEXT OBJECT
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLocalAuthInfo = () => {
    const localExpiryAt = localStorage.getItem('expiresAt');
  };

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get('/users/verify-token');
      console.log(`User logged in: ${loggedInRes.data}`);
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      console.log('getLoggedIn Error', error);
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
