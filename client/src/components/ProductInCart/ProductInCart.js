import React from 'react';
import { useShopContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { indexedDBStore } from '../../utils/helper';

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
        <div>
            <div>
                <img
                    src={require(`../../assets/imgs/${product.img}`)}
                    alt={`${product.description}`}
                />
            </div>
            <div>
                <div>{product.name}, ${product.price}</div>
                <div>
                    <span>Quantity:</span>
                    <input
                        type="number"
                        placeholder="1"
                        value={product.purchaseQuantity}
                        onChange={onChange}
                    />
                    <span
                        onClick={() => removeFromCart(product)}
                    >
                        X
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductInCart;