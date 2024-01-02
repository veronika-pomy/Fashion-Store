import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useShopContext } from '../../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { updateDB } from '../../utils/helper';
import { QUERY_CATEGORIES } from '../../utils/queries';

const CategoryMenu = () => {

    const [ state, dispatch ] = useShopContext();

    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                updateDB('categories', 'put', category);
            });
        } else if (!loading) {
            updateDB('categories', 'get').then((categories) => {
                dispatch({
                  type: UPDATE_CATEGORIES,
                  categories: categories,
                });
            });
        };
    }, [ categoryData, loading, dispatch ]); 

    const onClickHandler = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
          });
    };

    return (
        <div>
            <h3>Categories</h3>
            {categories.map((category) => {
                <button
                    key={category._id}
                    onClick={() => onClickHandler(category._id)}
                >
                    {category.name}
                </button>
            })}
        </div>
    );
};

export default CategoryMenu;