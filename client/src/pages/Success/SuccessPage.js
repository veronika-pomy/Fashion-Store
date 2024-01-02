import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../../utils/mutations';
import { updateDB } from '../../utils/helper';

const SuccessPage = () => {

  const [ addOrder ] = useMutation(ADD_ORDER);

  useEffect(() => {
    const saveOrder = async () => {
      const cart = await updateDB('cart', 'get')
      const products = cart.map((item) => item._id);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          updateDB('cart', 'delete', item);
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