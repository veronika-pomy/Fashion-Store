import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Cart from '../Cart/Cart';
import './NavBar.css';

const NavBar = () => {

  const authNavigation = () => {
    if(Auth.loggedIn()) {
      return (
        <ul className='d-flex flex-row m-0'>
          <li>
            <Link to='/orderHistory' className='link text-white  text-decoration-none'>
              Order History
            </Link>
          </li>
          <li className='px-3'> 
            <Link to="/" className='link text-white text-decoration-none' onClick={() => Auth.logout()}>
              Log Out
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='d-flex flex-row m-0 '>
          <li>
            <Link to='/signup' className='link text-white  text-decoration-none'>
              Sign Up
            </Link>
          </li>
          <li className='px-3'>
            <Link to='/login' className='link text-white text-decoration-none'>
              Log In
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className='bg-dark d-flex flex-row align-items-center p-1 sticky-top position-fixed fixed-top'>
      <h1 className='ms-2'>
        <Link to='/' className='text-decoration-none text-white'>
          <span>saide</span>
        </Link>
      </h1>
      <nav className=''>
        {authNavigation()}
      </nav>
      <Cart />
    </header>
  )
}

export default NavBar;