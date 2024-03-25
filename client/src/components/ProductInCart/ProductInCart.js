import React from 'react';
import { useShopContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { indexedDBStore } from '../../utils/helper';
import './ProductInCart.css';

const ProductInCart = ({ product }) => {

    const [, dispatch ] = useShopContext();

    const removeFromCart = product => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: product._id
        });
        indexedDBStore('cart', 'delete', { ...product });
    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: product._id
            });
            indexedDBStore('cart', 'delete', { ...product });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: product._id,
                purchaseQuantity: parseInt(value)
            });
            indexedDBStore('cart', 'put', { ...product, purchaseQuantity: parseInt(value) });
        };
    };

    return (
        <div className='cart-wrapper ms-4'>
            <div className='mt-4'>
                <img
                    className='cart-img'
                    src={require(`../../assets/imgs/${product.img}`)}
                    alt={`${product.description}`}
                />
            </div>
            <div className='cart-description h-75 ms-6'>
                <div>{product.name}</div>
                <div>
                    <div>${product.price}</div>
                    <div>Quantity:</div>
                    <input
                        type="number"
                        placeholder="1"
                        value={product.purchaseQuantity}
                        onChange={onChange}
                        className='qunt-input me-2'
                    />
                    <span
                        onClick={() => removeFromCart(product)}
                        role='button'
                    >
                        X
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductInCart;