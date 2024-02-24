import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShopContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART, TOGGLE_CART } from '../../utils/actions';
import Auth from '../../utils/auth';
import { indexedDBStore } from '../../utils/helper';
import { QUERY_CHECKOUT } from '../../utils/queries';
import ProductInCart from '../ProductInCart/ProductInCart';

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
  }, [ data ]);

  useEffect(() => {
    const getCart = async () => {
      const cart = await indexedDBStore('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    };

    if (!state.cart.length) {
      getCart();
    };
  }, [ state.cart.length, dispatch ]);

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  const calcTotal = () => {
    let sum = 0;
    state.cart.forEach((product) => {
      sum += product.price * product.purchaseQuantity;
    });
    return sum.toFixed(2);
  };
  
  const checkoutHandler = () => {
    const productIds = [];

    state.cart.forEach((product) => {
      for (let i = 0; i < product.purchaseQuantity; i++) {
        productIds.push(product._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div onClick={toggleCart}>
        <p>cart</p>
      </div>
    );
  }

  return (
    <div>
      <div onClick={toggleCart}>
        <p>close</p>
      </div>
      {state.cart.length ? 
        (<div>
          {state.cart.map((product) => (
            <ProductInCart key={product._id} product={product} />
          ))}
          <div>
            <strong>Your Total: ${calcTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={checkoutHandler}>Check out</button>
            ) : (
              <Link to='/login'>Log in to check out</Link>
            )}
          </div>
        </div>)
      :
        (<p>
          Your cart is empty.
        </p>
      )}
    </div>
  )
}

export default Cart;