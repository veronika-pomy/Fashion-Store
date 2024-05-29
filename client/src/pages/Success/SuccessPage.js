import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { indexedDBStore } from '../../utils/helper';
import { ADD_ORDER, UPDATE_PRODUCT } from '../../utils/mutations';
import './SuccessPage.css';

const SuccessPage = () => {

  const [ counter, setCounter ] = useState(5);

  const [ addOrder ] = useMutation(ADD_ORDER);
  const [ updateProduct ] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    // save order details
    const saveOrder = async () => {
      const cart = await indexedDBStore('cart', 'get');
      const products = [];
      for (let item of cart) {
        for (let i = 0; i < item.purchaseQuantity; i++) {
          products.push(item._id);
        };
      };

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          indexedDBStore('cart', 'delete', item);
        });

        // update product quantity in stock
        for (let item of productData) {
          const id = item._id;
          const quantity = 1;
          await updateProduct({ variables: { id, quantity }});
        };
      }

      // redirect to home
      setTimeout(() => {
        window.location.assign('/');
      }, 5000);
    };

    saveOrder();
  }, [ addOrder, updateProduct ]);

  // count down
  function countDown () {
    setCounter(counter - 1);
  };

  useEffect(() => {
    if (counter !== 1) {
      setTimeout(() => {
        countDown();
      }, 1000);
    };
  }, [ counter, countDown ]);

  return (
    <div className='success-wrapper position-relative text-white'>
      <div className='success-msg-wrapper'>
        <h2>Thank you for your purchase.</h2>
        <p>You're being redirected to the main page in {counter}</p>
      </div>
    </div>
  )
}

export default SuccessPage;