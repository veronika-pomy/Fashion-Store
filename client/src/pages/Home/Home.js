import React from 'react';
import Cart from '../../components/Cart/Cart';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import Products from '../../components/Products/Products';

const Home = () => {
    return (
        <div>
            <CategoryMenu />
            <Products />
            <Cart />
        </div>
    )
}

export default Home;