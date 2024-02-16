import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './NavBar.css'

const NavBar = () => {

  const authNavigation = () => {
    if(Auth.loggedIn()) {
      return (
        <ul className='d-flex flex-row m-0'>
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
        <ul className='d-flex flex-row m-0 '>
          <li>
            <Link to='/signup' className='nav-link text-white text-black:hover text-decoration-none'>
              Sign Up
            </Link>
          </li>
          <li className='px-3'>
            <Link to='/login' className='nav-link text-white text-decoration-none'>
              Log In
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className='bg-dark d-flex flex-row align-items-center p-1'>
      <h1 className='ms-2'>
        <Link to='/' className='text-decoration-none text-white'>
          <span>saide</span>
        </Link>
      </h1>
      <nav>
        {authNavigation()}
      </nav>
    </header>
  )
}

export default NavBar;