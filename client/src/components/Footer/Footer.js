import React from 'react'

const Footer = () => {
  return (
    <div className='d-flex flex-column flex-md-row align-center justify-content-evenly bg-dark text-white p-4 fs-6'>
        <div className='text-center mt-2'>
            <p className='fs-6'> Our Story</p>
            <p className='fs-6'>Testimonials</p> 
            <p className='fs-6'>Customer Service</p> 
            <p className='fs-6'>Community Outreach</p>
        </div>
        <div className='text-center mt-2'>
            <p className='fs-6'>Stores</p>
            <p className='fs-6'>Map</p> 
            <p className='fs-6'>Timezones</p> 
            <p className='fs-6'>Terms of Service</p>
            
        </div>
        <div className='text-center mt-2'>
            <p className='fs-6'>Designers</p>
            <p className='fs-6'>Ambassadors</p> 
            <p className='fs-6'>Sponsorships</p> 
            <p className='fs-6'>Partners</p>
        </div>
        <div className='text-center mt-2'>
            <p className='fs-6'>Instagram</p>
            <p className='fs-6'>TikTok</p>
            <p className='fs-6'>Facebook</p>
            <p className='fs-6'>YouTube</p>
        </div>
    </div>
  )
}

export default Footer;