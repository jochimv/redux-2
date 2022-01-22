import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions'

//by default, the initial PUT request with empty cart will override the existing cart stored in the server
//this is how to work around
let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  //--------------------//
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);
  //--------------------//


  //the problem is, that whenever we fetch the data from the database, this effect will be executed
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;