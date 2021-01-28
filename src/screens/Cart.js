import React, { useEffect, useState } from 'react';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

function Cart(props) {
  const cartItems = useSelector(state => state.ct.carts);
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);
  let res = cartItems.map((cart)=>(
    <CartItem cart={cart}/>
  ));

  const checkoutHandler = () => {
    console.log(props)
    props.history.push("/signin?redirect=shipping");
    //console.log(props)
  }

  return(
    <>
    <div>
      {res}
    </div>
    <div className="cart-action">
    <h3>
      Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
      :
       $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
    </h3>
    <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
      Proceed to Checkout
    </button>

  </div>
  </>
  );
}

const mapStateToProps = () => {};

export default withRouter(connect(mapStateToProps)(Cart));
