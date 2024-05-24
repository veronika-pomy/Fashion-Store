import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='d-flex flex-column flex-md-row align-center justify-content-evenly bg-dark text-white p-4 position-relative z-1'>
        <div className='mt-5'>
            <p className='footer-el mt-4'> Our Story</p>
            <p className='footer-el mt-4'>Testimonials</p> 
            <p className='footer-el mt-4'>Customer Service</p> 
            <p className='footer-el mt-4'>Outreach</p>
        </div>
        <div className='mt-5'>
            <p className='footer-el mt-4'>Store Locations</p>
            <p className='footer-el mt-4'>Contact</p> 
            <p className='footer-el mt-4'>Timezones</p> 
            <p className='footer-el mt-4'>Terms of Service</p>
            
        </div>
        <div className='mt-5'>
            <p className='footer-el mt-4'>Designers</p>
            <p className='footer-el mt-4'>Ambassadors</p> 
            <p className='footer-el mt-4'>Sponsorships</p> 
            <p className='footer-el mt-4'>Partners</p>
        </div>
        <div className='mt-5'>
            <p className='footer-el mt-4'>Instagram</p>
            <p className='footer-el mt-4'>TikTok</p>
            <p className='footer-el mt-4'>Facebook</p>
            <p className='footer-el mt-4'>YouTube</p>
        </div>
    </div>
  )
}

export default Footer;