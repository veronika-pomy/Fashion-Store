import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from '../../components/Cart/Cart';
import { useShopContext } from '../../utils/GlobalState';
import {
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
    REMOVE_FROM_CART,
} from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { updateDB } from '../../utils/helper';
// Loading Component

const ProductDetail = () => {

    const [ state, dispatch ] = useShopContext();

    const { id } = useParams();

    const [ product, setProduct ] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const { products, cart } = state;

    useEffect(() => {

        if (products.length) setProduct(products.find((product) => product._id === id));
        else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
        
            data.products.forEach((product) => {
                updateDB('products', 'put', product);
            });
        }
        else if (!loading) {
            updateDB('products', 'get').then((idxProducts) => {
                dispatch({
                  type: UPDATE_PRODUCTS,
                  products: idxProducts,
                });
            });
        } 

    }, [ products, data, loading, dispatch, id ]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            updateDB('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...product, purchaseQuantity: 1 },
            });
            updateDB('cart', 'put', { ...product, purchaseQuantity: 1 });
        }
    }

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: product._id,
        });
        updateDB('cart', 'delete', { ...product });
    }

    return (
        <>
            {product && cart ? 
                    (<div>
                        <Link to="/">Back</Link>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>
                            <strong>Price:</strong>${product.price}{' '}
                            <button onClick={addToCart}>Add</button>
                            <button
                                disabled={!cart.find((p) => p._id === product._id)}
                                onClick={removeFromCart}
                            >
                                Remove
                            </button>
                        </p>
                        <img
                            src={`/imgs/${product.img}`}
                            alt={product.name}
                         />
                    </div>)
                :
                    null
            }
            {loading ? <p>Loading...</p>: null}
            <Cart />
        </>
    );
}

export default ProductDetail;
