import React, { useEffect } from 'react';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

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
    props.history.push("/signin?redirect=shipping");
  }

  return (
    <div>
      <div class="shopping-cart">
        <div class="title">Shopping Bag</div>
        {res}
        </div>
      <div className="cart-action">
        <h5>
          Subtotal ({carts.reduce((a, c) => a + c.qty, 0)} items):
          ${carts.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
        </h5>
        <Button onClick={checkoutHandler} className="button primary full-width" disabled={carts.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = () => {};

export default withRouter(connect(mapStateToProps)(Cart));
