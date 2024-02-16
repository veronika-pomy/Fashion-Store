import React from 'react';
import { Link } from 'react-router-dom';
import { useShopContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { mult, indexedDBStore } from "../../utils/helper";
import './Product.css'

const Product = ({ product }) => {

    const [ state, dispatch ] = useShopContext();

    const { _id, img, name, price, quantity } = product;

    const { cart } = state;

    const addToCart = () => {
        const item = cart.find((cartItem) => cartItem._id === _id);
        if (item) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(item.purchaseQuantity) + 1
            });
            indexedDBStore('cart', 'put', {
                ...item,
                purchaseQuantity: parseInt(item.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...product, purchaseQuantity: 1 }
            });
            indexedDBStore('cart', 'put', { ...product, purchaseQuantity: 1 });
        };
    };

    return (
        <div className='col'>
            <Link className=' text-decoration-none' to={`/products/${_id}`}>
                <img
                    alt={name}
                    src={`/imgs/${img}`}
                    // width='340'
                    // height='510'
                    className='img-fluid'
                />
                <p className='nav-link text-dark'>{name}</p>
            </Link>
            <div className="center-block">
                <div>
                    {quantity} {mult('product', quantity)} available
                </div>
                <span>${price}</span>
            </div>
            <button 
                onClick={addToCart}
                className='text-lowercase'
            >
                Add to cart
            </button>
        </div>
    );
};

export default Product;