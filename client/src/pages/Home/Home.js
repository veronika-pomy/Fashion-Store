import React from 'react';
import Cart from '../../components/Cart/Cart';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import Hero from '../../components/Hero/Hero';
import Products from '../../components/Products/Products';

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