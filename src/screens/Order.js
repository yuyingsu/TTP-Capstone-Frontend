import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, listMyOrder, payOrder } from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  console.log(orderId)
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.listMyOrder);
  const dispatch = useDispatch();
  const { myOrder, success, error } = orderDetails;

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
      (myOrder && myOrder._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      //dispatch({ type: ORDER_DELIVER_RESET });
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
  };
  return (success ? <div>
      <h1>myOrder {myOrder._id}</h1>
      <div className="row top">
        <div className="col-8">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {myOrder.shipping.fullName} <br />
                  <strong>Address: </strong> {myOrder.shipping.address}, {myOrder.shipping.address2},
                  {myOrder.shipping.city},{' '}
                  {myOrder.shipping.state},
                  {myOrder.shipping.zip}
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
                  <strong>Method:</strong> {myOrder.paymentMethod}
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
                <h2>myOrder Items</h2>
                <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {                myOrder.orderItems.map(item =>
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

                  <div class="total-price ml-auto"><span><h5>{"$" + item.price*item.qty}</h5></span>
                  </div>

                </div>
                )}
                </ul>
              </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <div className="card card-body">
            <ul>
              <li>
                <h2>myOrder Summary</h2>
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
                    <strong> myOrder Total</strong>
                  </div>
                  <div>
                    <strong>${myOrder.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!myOrder.isPaid && (
                <li>
                  {!sdkReady ? (
                    <p>Loading...</p>
                  ) : (
                    <p>
                      {errorPay && (
                        {errorPay}
                      )}
                      {loadingPay && "Loading..."}

                      <PayPalButton
                        amount={myOrder.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </p>
                  )}
                </li>
              )}
              {userInfo.isAdmin && myOrder.isPaid && !myOrder.isDelivered && (
                <li>
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver myOrder
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div> : null );
}
