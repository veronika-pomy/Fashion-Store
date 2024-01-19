import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { indexedDBStore } from '../../utils/helper';
import { ADD_ORDER } from '../../utils/mutations';

const SuccessPage = () => {

  const [ addOrder ] = useMutation(ADD_ORDER);

  useEffect(() => {
    const saveOrder = async () => {
      const cart = await indexedDBStore('cart', 'get');
      const products = cart.map((item) => item._id);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          indexedDBStore('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 5000);
    };
    saveOrder();
  }, [ addOrder ]);

  return (
    <div>
      <h2>Thank you for your purchase!</h2>
      <p>You're being redirected to the main page...</p>
    </div>
  )
}

export default SuccessPage;