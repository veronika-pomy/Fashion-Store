import React from 'react';
import { Link } from 'react-router-dom';
import { useShopContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { indexedDBStore, mult } from "../../utils/helper";
import './Product.css';

const Product = ({ product }) => {

    const [ state, dispatch, loading ] = useShopContext();

    const { _id, image, name, price, quantity } = product;

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
        <div className='product col border border-secondary p-4 m-2 mt-3'>
            <Link className='text-decoration-none' to={`/products/${_id}`}>
                <img
                    alt={name}
                    src={require(`../../assets/images/${image}`)}
                    width='340'
                    height='510'
                    className='img-fluid border border-secondary'
                />
                <p className='nav-link text-dark mt-1 text-decoration-underline'>{name}</p>
            </Link>
            <div className="center-block">
                {quantity < 10 && quantity > 0 && 
                    <div className='left'>
                        {quantity} {mult('item', quantity)} left
                    </div>
                }
                {!quantity && 
                    <div className='left'>
                        item not in stock
                    </div>
                }
                <span>${price}</span>
            </div>
            <button 
                onClick={addToCart}
                className='text-lowercase btn btn-outline-secondary rounded-0 mt-1'
                disabled={!quantity}
            >
                Add to cart
            </button>
        </div>
    );
};

export default Product;