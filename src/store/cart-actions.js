import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//-----------------------//
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-getting-started-bc25a-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok){
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        }
        try{
            const cartData = await fetchData();
            //we will replace the beginning state with the fetched object
            dispatch(cartActions.replaceCart({
                // if the items array in the store is empty, it will not be pushed to the firebase, meaning when we fetch it, it will be undefined. For this case, if it is undefined, we will push an empty array [] to the store
                items: cartData.items || [], 
                totalQuantity: cartData.totalQuantity
            }));
        }catch(e){
         
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'fetching card data failed'
            }));
        }
      
    }
}
//---------------------------------//

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'sending',
                message: 'Sending cart data!'
            }));

        const sendRequest = async () => {

            const response = await fetch('https://react-getting-started-bc25a-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT', //PUT vs POST request - put will override the existing data in the cart node
                body: JSON.stringify(cart),
            });
            if (!response.ok) {
                throw new Error('sending data failed');
            }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully'
            }));
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending card data failed'
            }));
        };
    }
}

