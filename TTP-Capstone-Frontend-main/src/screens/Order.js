import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrder } from '../actions/orderActions';
function Order(props) {
  const theOrder = useSelector(state => state.listMyOrder);
  const { myOrder, success } = theOrder;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMyOrder(props.match.params.id));
    return () => {
    };
  }, []);

  return( success? <div>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {myOrder.shipping.address}, {myOrder.shipping.city},
            {myOrder.shipping.postalCode}, {myOrder.shipping.country},
        </div>
          <div>
            {myOrder.isDelivered ? "Delivered at " + myOrder.deliveredAt : "Not Delivered."}
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {myOrder.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Order
        </h3>
              <div>
                Price
        </div>
            </li>
            {
              myOrder.orderItems.length === 0 ?
                <div>
                  Order is empty
        </div>
                :
                myOrder.orderItems.map(item =>
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>
                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${myOrder.itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${myOrder.shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${myOrder.taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${myOrder.totalPrice}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>:null );
}

export default Order;
