import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Bootstrap Styles
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

//contexts
import AuthContext from './../../contexts/authContext';

//components
import LoginButton from './../Login-Button/Login-Button-component';
import LogoutButton from './../Logout-Button/Logout-Button.component';

export default function NavigationBar(props) {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <NavLink to='/' exact className=' navbar-brand' activeClassName=''>
          Video Search!
        </NavLink>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <NavLink
              to='/favorites'
              exact
              className='nav-link'
              activeClassName='active-nav-link'
            >
              Favorites
            </NavLink>
            <NavLink
              to='/search'
              exact
              className='nav-link'
              activeClassName='active-nav-link'
            >
              Search
            </NavLink>
          </Nav>
          <Nav>
            {/* auth component */}
            <>{loggedIn ? <LogoutButton /> : <LoginButton />}</>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
