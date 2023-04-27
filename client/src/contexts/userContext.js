import { createContext, useEffect } from 'react';
import { userReducer } from './../reducers/userReducer';
import axios from 'axios';

const defaultUser = {
  token: undefined,
  user: undefined,
  isLoggedIn: '',
  isAdmin: '',
};

const UserContext = createContext();
const UserDispatch = createContext(); //in case we need to separate state and dispatch

export function UserProvider(props) {
  const getLocalUser = () => {
    const localData = localStorage.getItem('user');
    return localData ? JSON.parse(localData) : {}; //parse string json and turn into json obj
  };

  //   create init state for the reducer
  const [user, dispatch] = userReducer(userReducer, defaultUser, getLocalUser);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user)); //setting every user updates
  }, [user]);

  return (

    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}

// export default createContext(null);
export default UserContext;
