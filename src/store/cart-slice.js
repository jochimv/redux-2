import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        //because when we fetch the data, the initial cart is updated and updating the cart will also post the data. We solve this by adding this variable
        //The default value is false. If we change the cart, changed will be set to true, and before we post the data, we will check this value with useSelector and cart.changed (see App.js)
        changed: false
    },
    reducers: {
        //---------------------------------//
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }, 
        //---------------------------------//
        addItemToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            //check whether the item is already there by comparing IDs
            const existingItem = state.items.find(item => item.id === newItem.id);
            //if it is not there, we will push a new item to the "items" array in the store
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
                //if it is already in the store, we will  just update quantity and total price
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            state.changed = true;
            
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }

        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;