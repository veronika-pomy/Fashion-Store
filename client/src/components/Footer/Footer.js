import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='d-flex flex-column flex-md-row align-center justify-content-evenly bg-dark text-white p-4'>
        <div className='mt-2'>
            <p className='footer-el'> Our Story</p>
            <p className='footer-el'>Testimonials</p> 
            <p className='footer-el'>Customer Service</p> 
            <p className='footer-el'>Outreach</p>
        </div>
        <div className='mt-2'>
            <p className='footer-el'>Store Locations</p>
            <p className='footer-el'>Contact</p> 
            <p className='footer-el'>Timezones</p> 
            <p className='footer-el'>Terms of Service</p>
            
        </div>
        <div className='mt-2'>
            <p className='footer-el'>Designers</p>
            <p className='footer-el'>Ambassadors</p> 
            <p className='footer-el'>Sponsorships</p> 
            <p className='footer-el'>Partners</p>
        </div>
        <div className='mt-2'>
            <p className='footer-el'>Instagram</p>
            <p className='footer-el'>TikTok</p>
            <p className='footer-el'>Facebook</p>
            <p className='footer-el'>YouTube</p>
        </div>
    </div>
  )
}

export default Footer;