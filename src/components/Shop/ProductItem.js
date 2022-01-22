import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  
  const dispatch = useDispatch();

  const addToCartHandler = () => {
      dispatch(cartActions.addItemToCart({
        //pointing at the values which we are extracting from props
        id:id,
        //this is a js shortcut, and means title: title and price: price
        title,
        price
      }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div> 
      </Card>
    </li>
  );
};

export default ProductItem;
