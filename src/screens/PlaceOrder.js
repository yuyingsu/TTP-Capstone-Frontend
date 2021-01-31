import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { Button } from 'reactstrap';
import CartItem from '../components/CartItem';

function PlaceOrder(props) {
  const cart = useSelector(state => state.ct);
  const orderCreate = useSelector(state => state.createOrder);
  const { success, order, loading } = orderCreate;
  const { carts, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = carts.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: carts, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top" style={{margin: "0px"}}>
        <div className="col-7" style={{marginLeft:"20px"}}>
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  {shipping.fullName} <br />
                  <strong></strong> {shipping.address}<br />{shipping.address2 && shipping.address2}{shipping.address2 && <br />}
                  {shipping.city + ", " + shipping.state + " " + shipping.zip}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {payment.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {carts.map(item =>
                    <div class="item">

                      <div class="image">
                          <img src={item.image} style={{height:"100px", width:"100px"}}/>
                      </div>

                      <div class="description">
                          <h5><Link to={`/product/${item._id}`}><span>{item.name}</span></Link></h5>
                      </div>

                      <div class="quantity">
                        <span>{"Qty: " + item.qty}</span>
                      </div>

                      <div class="total-price ml-auto"><span><h5>{"$" + (item.price * item.qty).toFixed(2)}</h5></span>
                      </div>

                    </div>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
              <br />
                <Button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={carts.length === 0}
                >
                  Place Order
                </Button>
              </li>
              {loading && "Loading..."}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
