import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useShopContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART, TOGGLE_CART } from '../../utils/actions';
import Auth from '../../utils/auth';
import { indexedDBStore } from '../../utils/helper';
import { QUERY_CHECKOUT } from '../../utils/queries';
import ProductInCart from '../ProductInCart/ProductInCart';
import './Cart.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

  const [ state, dispatch ] = useShopContext();

  const [ getCheckout, { data } ] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [ data]);

  useEffect(() => {
    async function getCart () {
      const cart = await indexedDBStore('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    };

    if (!state.cart.length) {
      getCart();
    };
  }, [ state.cart.length, dispatch ]);

  function toggleCart () {
    dispatch({ type: TOGGLE_CART });
  };

  function calcTotal () {
    let sum = 0;
    state.cart.forEach((product) => {
      sum += product.price * product.purchaseQuantity;
    });
    return sum.toFixed(2);
  };
  
  function checkoutHandler () {

    const productIds = [];

    state.cart.forEach((product) => {
      for (let i = 0; i < product.purchaseQuantity; i++) {
        productIds.push(product._id);
      };
    });

    getCheckout({
      variables: { products: productIds },
    });
  };

  if (!state.cartOpen) {
    return (
      <div 
        className='text-white position-absolute top-0 end-0 z-1 me-4 mt-2'
        onClick={toggleCart}
      >
        <MdOutlineShoppingBag size={26} />
      </div>
    );
  }

  return (
    <div className='cart text-dark bg-white position-absolute top-0 end-0'>
      <div onClick={toggleCart} className='cart-close m-2'>
        <p className='close text-end fs-6'>
          [close]
        </p>
      </div>
      <h5 className='text-dark text-center m-4'>Your Shopping Cart</h5>
      <hr className=' border border-dark ms-4 me-4'/>
      {state.cart.length ? 
        (<div className='m-5'>
          {state.cart.map((product) => (
            <ProductInCart key={product._id} product={product} />
          ))}
          <div className='d-flex flex-column mt-3'>
            <strong>Total: ${calcTotal()}</strong>
            <hr className=' border border-dark' />
            {Auth.loggedIn() ? (
              <button 
                onClick={checkoutHandler}
                className='checkout-btn btn btn-dark rounded-0 text-lowercase mt-3'
              >
                check out
              </button>
            ) : (
              <Link to='/login' className='text-center checkout-link text-decoration-none text-dark mt-3'>
                Log in to check out
              </Link>
            )}
          </div>
        </div>)
      :
        (<p className='m-4'>
          empty
        </p>
      )}
    </div>
  )
}

export default Cart;