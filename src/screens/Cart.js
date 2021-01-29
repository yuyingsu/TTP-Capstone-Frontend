import React, { useEffect, useState } from 'react';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
function Cart(props) {
  const cart = useSelector(state => state.ct);
  const {carts} = cart;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);
  let res = carts.map((cart)=>(
    <CartItem cart={cart}/>
  ));

  const checkoutHandler = () => {
    console.log(props)
    props.history.push("/signin?redirect=shipping");
    console.log(props)
  }
  console.log(carts);
  return(
    <div>
    <div>
      {res}
    </div>
    <div className="cart-action">
    <h3>
      Subtotal ( {carts.reduce((a, c) => a + c.qty, 0)} items)
      :
       $ {carts.reduce((a, c) => a + c.price * c.qty, 0)}
    </h3>
    <button onClick={checkoutHandler} className="button primary full-width" disabled={carts.length === 0}>
      Proceed to Checkout
    </button>
  </div>
  </div>
  );
}


export default Cart;
