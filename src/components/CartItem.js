import React from 'react';
import { deleteFromCart, changeQtyInCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function CardProduct(props) {
  const dispatch = useDispatch();
  const deleteProduct = () =>{
    dispatch(deleteFromCart(props.cart._id));
  }
  const changeQty = (qty) => {
    dispatch(changeQtyInCart(props.cart._id, parseInt(qty)));
  }
  let price = props.cart.price * props.cart.qty;

  return (
    <div class="item">

      <div class="image">
        <img src={props.cart.image} style={{height:"100px", width:"100px"}}/>
      </div>

      <div class="description">
        <h5><Link to={`/product/${props.cart._id}`}><span>{props.cart.name}</span></Link></h5>
      </div>

      <div class="quantity">
        <span>
          <select id="item-quantity" onChange={(e)=>{changeQty(e.target.value)}}>
          {
            [...Array(props.cart.countInStock).keys()].slice(0,10).map(x => {
              if (x + 1 === props.cart.qty) {
                return <option selected="selected">{props.cart.qty}</option>;
              } else {
                return <option key={x + 1} value={x + 1}>{x + 1}</option>;
              }
            })
          }
          </select>
        </span>
      </div>

      <div class="total-price ml-auto"><span><h5>{"$" + price}</h5></span>
      <span><a href="#" onClick={deleteProduct}>Remove</a></span>
      </div>

    </div>
  );
}

export default CardProduct;
