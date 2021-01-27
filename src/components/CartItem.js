import React from 'react';
import { deleteFromCart, changeQtyInCart } from '../actions/cartAction';
import { useDispatch } from 'react-redux';
function CardProduct(props) {
  const dispatch = useDispatch();
  const deleteProduct = () =>{
      dispatch(deleteFromCart(props.cart._id));
  }
  const changeQty = (qty) => {
      dispatch(changeQtyInCart(props.cart._id,qty));
  }
  let price = props.cart.price*props.cart.qty;
  return(
        <div>
            {props.cart.name}
            <img src={props.cart.image} style={{height:"50px", width:"50px"}}/>
            <div>{price}</div>
            <select onChange={(e)=>{changeQty(e.target.value)}}>
            {[...Array(props.cart.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
            </select>
            <button onClick={deleteProduct}>Delete</button>
        </div>
    );
}

export default CardProduct;
