import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useShopContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { indexedDBStore } from '../../utils/helper';
import { QUERY_PRODUCTS } from '../../utils/queries';
import Product from '../Product/Product';

const Products = () => {

  const [ state, dispatch ] = useShopContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        indexedDBStore('products', 'put', product);
      });
    } else if (!loading) {
      indexedDBStore('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    };
  },  [ data, loading, dispatch ]);

  const filterProductsByCategory = () => {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  };

  return (
    <div className='container ps-1 pe-1 pb-5'>
      {state.products.length ? (
        <div className='row justify-content-around row-cols-1 row-cols-md-3 row-cols-xl-3 gx-5 gy-5 mt-4'>
          {
            filterProductsByCategory().map((product) =>(
              <Product
                key={product._id}
                product={product}
              />
            ))
          }
        </div>
      )
        :
        (<p>No products under this category.</p>)
      }
      {loading ? <p>Loading...</p> : null}
    </div>
  )
}

export default Products;