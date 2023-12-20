import React, { createContext, useContext } from "react";\
import { useProductReducer } from './reducers'

const ShopContext = createContext();
const { Provider } = ShopContext;

const ShopProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useShopContext = () => {
    return useContext(ShopContext);
};

export { ShopProvider, useShopContext };
