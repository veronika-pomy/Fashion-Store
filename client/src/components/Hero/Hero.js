import React from 'react';
import { Link } from 'react-scroll';
import heroimage from '../../assets/images/hero.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <div id='hero' className='hero position-relative'>
      <Link
        spy={true} 
        span={true} 
        to='cat-menu'
      >
        <button 
          type="button" 
          className="btn 
                    btn-shop-now
                    btn-outline-light
                    position-absolute
                    z-1 
                    ps-5 
                    pe-5 
                    pt-2 
                    pb-2 
                    border-2 
                    fw-bold
                    text-lowercase
                    rounded-0"
          >
            Shop Now
        </button>
      </Link>
      <img src={heroimage}
          alt='A fashionable store window with clothes on display' 
          width='100%' 
          height='100%'
          className='position-absolute z-0'
      /> 
    </div>
  )
}

export default Hero;