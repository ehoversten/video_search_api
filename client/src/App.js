import { Route, Switch } from 'react-router-dom';
import './App.css';

//Material Ui



import Homepage from './Pages/homepage/homepage.component';
import SignUp from './Pages/sign-up/sign-up.component';
import Login from './Pages/login/loginComponent';


function App() {
  return (
    <div className='App'>
        {/* <h1>Header</h1> */}
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </Switch>
    </div>
  );
}

export default App;
