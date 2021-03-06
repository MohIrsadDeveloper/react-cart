import React, { useContext, useReducer } from 'react'
import { createContext } from 'react' // Import creteContext
import faker from '@faker-js/faker'
import { cartReducer, productReducer } from './Reducers';

const CartContext = createContext();  // Create Cart Context.
faker.seed(99)

const Context = ({ children }) => {

    const products = [...Array(20)].map(() => ({
        id : faker.datatype.uuid(),
        name : faker.commerce.productName(),
        price : faker.commerce.price(),
        image : faker.image.image(),
        inStock : faker.random.arrayElement([0,3,5,6,7]),
        fastDelivery : faker.datatype.boolean(),
        ratings : faker.random.arrayElement([1,2,3,4,5])
    }));

    const [state, dispatch] = useReducer(cartReducer, {
        products : products,
        cart : []
    })

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock : false,
        byFastDelivery : false,
        byRating : 0,
        searchQuery : "",
    });

    console.log(productState);

    return (
        <CartContext.Provider value={{state,dispatch, productState, productDispatch}} >
            {children}
        </CartContext.Provider>
    )
}

export default Context;

export const CartState =  () => {
    return useContext(CartContext);
}