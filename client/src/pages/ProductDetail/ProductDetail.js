import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cart from '../../components/Cart/Cart';
import { useShopContext } from '../../utils/GlobalState';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    UPDATE_PRODUCTS,
} from '../../utils/actions';
import { indexedDBStore } from '../../utils/helper';
import { QUERY_PRODUCTS } from '../../utils/queries';

const ProductDetail = () => {

    const [ state, dispatch ] = useShopContext();

    const { id } = useParams();

    const [ product, setProduct ] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const { products, cart } = state;

    useEffect(() => {

        if (products.length) {
            setProduct(products.find((product) => product._id === id));
        } else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
        
            data.products.forEach((product) => {
                indexedDBStore('products', 'put', product);
            });
        } else if (!loading) {
            indexedDBStore('products', 'get').then((idxProducts) => {
                dispatch({
                  type: UPDATE_PRODUCTS,
                  products: idxProducts,
                });
            });
        };
    }, [ products, data, loading, dispatch, id ]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            indexedDBStore('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...product, purchaseQuantity: 1 },
            });
            indexedDBStore('cart', 'put', { ...product, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: product._id,
        });
        indexedDBStore('cart', 'delete', { ...product });
    }

    return (
        <>
            <h1>TEST</h1>
            {/* {product && cart ? 
                    (<div>
                        <Link to="/">Return</Link>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>
                            <strong>Price:</strong>${product.price}{' '}
                            <button 
                                onClick={addToCart}
                                className='text-lowercase'
                            >
                                Add
                            </button>
                            <button
                                disabled={!cart.find((p) => p._id === product._id)}
                                onClick={removeFromCart}
                                className='text-lowercase'
                            >
                                Remove
                            </button>
                        </p>
                        <image
                            src={require(`../../assets/images/${product.image}`)}
                            alt={product.name}
                         />
                    </div>)
                :
                    null
            }
            {loading ? <p>Loading...</p>: null}
            <Cart /> */}
        </>

    );
}

export default ProductDetail;
