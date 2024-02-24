import React from 'react';
import './Error.css';
import errorImg from '../../assets/imgs/error.jpg';

const Error = () => {
  return (
    <div className='error position-relative'>
      <h1
        className='position-absolute top-50 start-50 translate-middle z-1 fs-4'
      >
        The page you are looking for doesn't exist.
      </h1>
      <img src={errorImg}
        alt='Error page' 
        width='100%' 
        height='100%'
        className='position-absolute z-0'
      /> 
    </div>
  )
}

export default Error;