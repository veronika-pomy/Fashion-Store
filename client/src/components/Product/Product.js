import React from 'react';
import { Link } from 'react-router-dom';
import { useShopContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { mult, updateDB } from "../../utils/helper";

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
            updateDB('cart', 'put', {
                ...item,
                purchaseQuantity: parseInt(item.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });
            updateDB('cart', 'put', { ...item, purchaseQuantity: 1 });
        };
    };

    return (
        <div>
            <Link to={`/products/${_id}`}>
                <img
                    alt={name}
                    src={`/imgs/${img}`}
                />
                <p>{name}</p>
            </Link>
            <div>
                <div>{quantity} {mult('product', quantity)} available</div>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
};

export default Product;