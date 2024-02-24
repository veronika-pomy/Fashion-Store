import React from 'react';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import Hero from '../../components/Hero/Hero';
import Products from '../../components/Products/Products';

const Home = () => {
    return (
        <div id='home position-relative'>
            <Hero />
            <CategoryMenu />
            <Products />
        </div>
    )
}

export default Home;