import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const NavBar = () => {

  const authNavigation = () => {
    if(Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to='/orderHistory'>
              Order History
            </Link>
          </li>
          <li> 
            <Link to="/" onClick={() => Auth.logout()}>
              Log Out
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to='/signup'>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to='/login'>
              Log In
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <h1>
        <Link to='/'>
          <span>Saide</span>
        </Link>
      </h1>
      <nav>
        {authNavigation()}
      </nav>
    </header>
  )
}

export default NavBar;