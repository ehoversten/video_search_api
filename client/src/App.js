import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// -- TESTING -- //
import UserContext, { UserProvider } from './contexts/userContext';
import AuthContext, { AuthContextProvider } from './contexts/authContext';
import VideoContext, { VideoContextProvider } from './contexts/videoContext';
import { SearchContextProvider } from './contexts/searchHistoryContext';

//Bootstrap Styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Homepage from './Pages/homepage/homepage.component';
import AuthDashboard from './Pages/auth/dashboardComponent';
import Signup from './Pages/signup/Signup.component';
import Login from './Pages/login/Login.Component';
import NavigationBar from './components/navbar/Nav.component';
import SearchContainer from './Pages/search/SearchContainer';
import Detail from './components/detail/detail.component';
import FavoritesList from './components/favorites/favorites-list.component';
import FavoriteDetail from './components/favorites/favorites.detail.component'

function App() {
  // Define User Hook
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // const { loggedIn, setLoggedIn } = useContext(AuthContextProvider);
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {

  }, []);

  return (
    <div className='App'>
      <AuthContextProvider value={{ loggedIn, setLoggedIn }}>
        <VideoContextProvider>
          <SearchContextProvider>
            <NavigationBar user={userData}/>
            <Container>
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/users' component={AuthDashboard} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/search/:id' component={Detail} />
                <Route exact path='/search' component={SearchContainer} />
                <Route exact path='/favorites/:id' component={FavoriteDetail} />
                <Route exact path='/favorites' component={FavoritesList} />
              </Switch>
            </Container>
          </SearchContextProvider>
        </VideoContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
