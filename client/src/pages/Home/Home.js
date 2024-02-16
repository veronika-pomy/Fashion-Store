import React from 'react';
import Cart from '../../components/Cart/Cart';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import Products from '../../components/Products/Products';
import Hero from '../../components/Hero/Hero';

const Home = () => {
    return (
        <div id='home'>
            <Hero />
            <CategoryMenu />
            <Products />
            <Cart />
        </div>
    )
}

export default Home;