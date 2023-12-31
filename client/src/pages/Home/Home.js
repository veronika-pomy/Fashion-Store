import React from 'react';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import Products from '../../components/Products/Products';
import Cart from '../../components/Cart/Cart';

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