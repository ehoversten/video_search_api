import { useHistory, useRouteMatch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function LoginButton(props) {
  const history = useHistory();
  const match = useRouteMatch('/login');

  return match ? (
    <p></p>
  ) : (
    <NavLink className='btn btn-primary' to='/login'>
      Log In
    </NavLink>
  );
}

export default LoginButton;
