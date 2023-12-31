import React, { useEffect } from 'react'
import Product from '../Product/Product';
import { useShopContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { updateDB } from '../../utils/helper';
// Loading Component

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
        updateDB('products', 'put', product);
      });
    } else if (!loading) {
      updateDB('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    };
  },  [ data, loading, dispatch ]);

  const filterProductsByCat = () => {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  };

  return (
    <div>
      <h3>Products</h3>
      {state.products.length ? (
        <div>
          {
            filterProductsByCat().map((product) =>(
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