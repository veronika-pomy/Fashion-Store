import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useShopContext } from '../../utils/GlobalState';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    UPDATE_PRODUCTS,
} from '../../utils/actions';
import { indexedDBStore } from '../../utils/helper';
import { QUERY_PRODUCTS } from '../../utils/queries';
import './ProductDetail.css';
import ProductDetailLoading from './ProductDetailLoading';

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

    if(loading) return (
        <ProductDetailLoading />
    )

    return (
        <div className='product-detail-container position relative ms-4'>
            {product && cart ? 
                    (<div className='prod-wrapper d-flex flex-row flex-wrap'>
                        <img
                            src={`/images/${product.image}`}
                            alt={product.name}
                            className='prod-img ms-4 mt-5 me-4'
                         />
                        <div className='text-wrapper'>
                            <Link 
                                className='return-link 
                                            text-center 
                                            text-decoration-underline
                                            text-dark 
                                            mt-3' 
                                to="/"
                            >
                                Return to the main store    
                            </Link>
                            <h3 className='prod-name'>{product.name}</h3>
                            <p className='description-wrapper'>{product.description}</p>
                            <p>
                                <strong>Price:</strong>{' '}${product.price}{' '}
                                <div className='mt-2'>
                                    <button 
                                        onClick={addToCart}
                                        className='text-lowercase me-2 btn btn-dark rounded-0'
                                    >
                                        Add
                                    </button>
                                    <button
                                        disabled={!cart.find((p) => p._id === product._id)}
                                        onClick={removeFromCart}
                                        className='text-lowercase btn btn-dark rounded-0'
                                    >
                                        Remove
                                    </button>
                                </div>
                
                            </p>
                        </div>
                    </div>)
                :
                    null
            }
        </div>

    );
}

export default ProductDetail;
