import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function MyOrders(props) {
  const dispatch = useDispatch();
  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    dispatch(listMyOrders());
    return () => {};
  }, [])

  return <div className="profile-orders content-margined">
  { loadingOrders ? <div>Loading...</div> :
    errorOrders ? <div>{errorOrders}</div> :
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt}</td>
            <td>{"$" + order.totalPrice.toFixed(2)}</td>
            <td>{order.isPaid && "PAID"}</td>
            <td>
              <Link to={"/order/" + order._id}>DETAILS</Link>
            </td>
          </tr>)}
        </tbody>
      </table>
  }
  </div>
}

export default MyOrders;
