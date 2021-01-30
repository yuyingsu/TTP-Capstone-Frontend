import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { listAllOrder, deleteOrder, deliverOrder } from '../actions/orderActions';
import CheckboxGroup from 'react-checkbox-group'
import { ContactSupportOutlined } from '@material-ui/icons';
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
  console.log("orders" + orders)
  console.log(allOrders)
  return(
        <div>
             <Table responsive hover>
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
            <th>Delivered</th>
            </tr>
            </thead>
            <tbody>
            {1+1===3 ? orders.map((order) => (
            <tr key={order._id}>
                <td>{order._id}</td>
                <td>{JSON.stringify(order.orderItems).substring(1,JSON.stringify(order.orderItems).length-1).replace(/["{}]/g, "").replace(/,/g," ")}</td>
                <td>{JSON.stringify(order.shipping).substring(1,JSON.stringify(order.orderItems).length-1).replace(/["{}]/g, "").replace(/,/g," ")}</td>
                <td>{JSON.stringify(order.payment).substring(1,JSON.stringify(order.orderItems).length-1).replace(/["{}]/g, "").replace(/,/g," ")
                .replace("paymentMethod","Payment Method")}</td>
                <td>{order.itemsPrice}</td>
                <td>{order.shippingPrice}</td>
                <td>{order.taxPrice}</td>
                <td>{order.totalPrice}</td>
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
