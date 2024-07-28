import { describe, it, expect } from "vitest";

import { reducer } from "../utils/reducers";
import {
    ADD_MULTIPLE_TO_CART,
    ADD_TO_CART,
    CLEAR_CART,
    REMOVE_FROM_CART,
    TOGGLE_CART,
    UPDATE_CART_QUANTITY,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_PRODUCTS
} from '../utils/actions';

// set up initial cart state
 const initialState = {
    products: [],
    cart: [
        {
            _id: '1',
            name: 'Blue dress',
            purchaseQuantity: 1
        },
        {
            _id: '2',
            name: 'Black dress',
            purchaseQuantity: 2
        }
    ],
    cartOpen: false, 
    categories: [ { name: 'Dresses' } ],
    currentCategory: '1',
};

describe('reducer() for the Products component behavior.', () => {
    it('UPDATE_PRODUCTS: Should update products array with provided products.', () => {
        const updatedProducts = [ { }, { } ];
        const newState = reducer(initialState, {
            type: UPDATE_PRODUCTS,
            products: updatedProducts
        });

        expect(newState.products.length).toBe(updatedProducts.length);
    });
});

describe('reducer() for the Cart component behavior.', () => {
    it('ADD_TO_CART: Should update cart quantity when a product is added to the Cart.', () => {
        const newState = reducer(initialState, {
            type: ADD_TO_CART,
            product: { purchaseQuantity: 1 }
        });

        expect(newState.cart.length).toBe(3);
    });

    it('UPDATE_CART_QUANTITY: Should update the purchase quantity of the product corresponding to the provided id.', () => {
        const productId = '1';
        const newQuantity = 3;
        const newState = reducer(initialState, {
            type: UPDATE_CART_QUANTITY,
            _id: productId,
            purchaseQuantity: newQuantity
        });

        expect(newState.cart[0].purchaseQuantity).toBe(newQuantity);
    });

    it('REMOVE_FROM_CART: Should remove a product from the Cart by the provided id.', () => {
        const newState = reducer(initialState, {
            type: REMOVE_FROM_CART,
            _id: '1'
          });
        
          expect(newState.cart.length).toBe(1);
          expect(newState.cart[0]._id).toBe('2');
    });

    it('ADD_MULTIPLE_TO_CART: Should add multiple products to the Cart.', () => {
        const addedProducts = [ { }, { } ];
        const newState = reducer(initialState, {
            type: ADD_MULTIPLE_TO_CART,
            products: addedProducts
          });
        
          expect(newState.cart.length).toBe(addedProducts.length + initialState.cart.length);
    });

    it('CLEAR_CART: Should empty the Cart.', () => {
        const newState = reducer(initialState, {
            type: CLEAR_CART
        });

        expect(newState.cart.length).toBe(0);
    });

    it('CLEAR_CART: Should keep the Cart component set to be "open" when it becomes empty.', () => {
        const newState = reducer(initialState, {
            type: CLEAR_CART
        });

        expect(newState.cartOpen).not.toBe(false);
    });

    it('TOGGLE_CART: Should set the Cart\'s component "open/closed" status to the opposite when toggled.', () => {
        const newState = reducer(initialState, {
            type: TOGGLE_CART
        });

        expect(newState.cartOpen).toBe(!initialState.cartOpen);
    });
});

describe('reducer() for the CategoryMenu component behavior.', () => {
    it('UPDATE_CATEGORIES: Should update the categories array with provided categories.', () => {
        const updatedCategories = [ { }, { } ];
        const newState = reducer(initialState, {
            type: UPDATE_CATEGORIES,
            categories: updatedCategories
          });
        
          expect(newState.categories.length).toBe(updatedCategories.length);
    });

    it('UPDATE_CURRENT_CATEGORY: Should update currentCategory with a privided category id.', () => {
        const newCategoryId = '2'
        const newState = reducer(initialState, {
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: newCategoryId
        });

        expect(newState.currentCategory).toBe(newCategoryId);
        expect(newState.currentCategory).not.toBe(initialState.currentCategory);
    });
});