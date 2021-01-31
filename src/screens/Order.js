import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, listMyOrder, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { Button } from 'reactstrap';

export default function Order(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.listMyOrder);
  const dispatch = useDispatch();
  const { myOrder, success, error, leave } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !myOrder ||
      successPay ||
      myOrder.isDelivered ||
      (myOrder && myOrder._id !== orderId) ||
      leave
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(listMyOrder(orderId));
    } else {
      if (!myOrder.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(myOrder, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(myOrder));
    dispatch(listMyOrder(orderId));
  };

  return (success ?
    <div>
      <br />
      <h1>Order {myOrder._id}</h1>
      <div className="row top" style={{margin: "0px"}}>
        <div className="col-8">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  {myOrder.shipping.fullName} <br />
                  {myOrder.shipping.address}<br />
                  {myOrder.shipping.address2 && myOrder.shipping.address2}
                  {myOrder.shipping.address2 && <br />}
                  {myOrder.shipping.city},{' '}
                  {myOrder.shipping.state + " " + myOrder.shipping.zip}
                </p>
                {myOrder.isDelivered ? (
                  <h5>
                    Delivered at {myOrder.deliveredAt}
                  </h5>
                ) : (
                  <h5>Not Delivered</h5>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {myOrder.payment.paymentMethod}
                </p>
                {myOrder.isPaid ? (
                    <h5>Paid at {myOrder.paidAt}</h5>
                ) : (
                  <h5>Not Paid</h5>
                )}
              </div>
            </li>
            <li>
                <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {myOrder.orderItems.map(item =>
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
                  <div>${myOrder.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${myOrder.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${myOrder.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>${myOrder.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <br />
              {!myOrder.isPaid &&
                <li>
                  <PayPalButton
                    amount={myOrder.totalPrice.toFixed(2)}
                    onSuccess={successPaymentHandler}
                  ></PayPalButton>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div> : null
  );
}
