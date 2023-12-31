import React from 'react'
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const NavBar = () => {

  const authNavigation = () => {
    if(Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to='/orders'>
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
          <span arial-label='Logo'>
            Logo
          </span>
          <span> </span>
            E-Shop
        </Link>
      </h1>
      <nav>
        {authNavigation()}
      </nav>
    </header>
  )
}

export default NavBar;