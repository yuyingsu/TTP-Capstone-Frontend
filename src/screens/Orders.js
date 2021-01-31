import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { listAllOrder, deleteOrder, deliverOrder } from '../actions/orderActions';
import CheckboxGroup from 'react-checkbox-group'
import { Link } from 'react-router-dom';

function Orders(props) {
  const allOrders = useSelector(state => state.listAllOrder);
  const { orders, success } = allOrders;
  const dispatch = useDispatch();
  const deleteAOrder = (order) =>{
    dispatch(deleteOrder(order));
  }

  useEffect(() => {
    dispatch(listAllOrder());
  }, []);

  const deliver = (order) =>{
    dispatch(deliverOrder(order));
  }

  return (
    <div>
      <Table responsive hover className="orders">
      <thead>
      <tr>
      <th>Id</th>
      <th>Order Items</th>
      <th>Shipping</th>
      <th>Payment</th>
      <th>Item Price</th>
      <th>Shipping Price</th>
      <th>Tax Price</th>
      <th>Total Price</th>
      <th>Paid</th>
      <th>Delivered</th>
      </tr>
      </thead>
      <tbody>
      { success ? orders.map((order) => (
      <tr key={order._id} style={{textAlign:"left"}}>
          <td><Link to={'/order/' + order._id}>{order._id}</Link></td>
          <td>{JSON.stringify(order.orderItems).substring(1,JSON.stringify(order.orderItems).length-1).replace(/["{}]/g, "").replace(/,/g,'\n').replace(/:/g,': ')}</td>
          <td>{JSON.stringify(order.shipping).substring(1,JSON.stringify(order.orderItems).length-1).replace(/["{}]/g, "").replace(/,/g,'\n')
          .replace("fullName","name").replace(/:/g,': ')}</td>
          <td>{JSON.stringify(order.payment).substring(1,JSON.stringify(order.orderItems).length-1).replace(/["{}]/g, "").replace(/,/g,'\n')
          .replace("paymentMethod","method").replace(/:/g,': ')}</td>
          <td>{order.itemsPrice.toFixed(2)}</td>
          <td>{order.shippingPrice.toFixed(2)}</td>
          <td>{order.taxPrice.toFixed(2)}</td>
          <td>{order.totalPrice.toFixed(2)}</td>
          <td>{order.isPaid ? "Yes" : "No"}</td>
          <td>{order.isDelivered?"Yes":"No"}</td>
          <td>
          <div style={{width:"110px"}}>
          <CheckboxGroup>
          {(Checkbox) => (
            <>
              {!order.isDelivered?
              <label>
                <Checkbox value="Delivered" onClick={() => deliver(order)}/> Mark As Delivered
              </label>:null}
            </>
          )}
        </CheckboxGroup>
          <Button color="danger" onClick={() => deleteAOrder(order)}>Del</Button>
          </div>
          </td>
      </tr>
      )):null}
      </tbody>
      </Table>
    </div>
  );
}

export default Orders;
