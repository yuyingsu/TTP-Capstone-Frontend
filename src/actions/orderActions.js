import Axios from 'axios';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  LIST_MY_ORDER,
  LIST_MY_ORDER_REQUEST,
  FETCH_ORDER,
  FETCH_ORDER_REQUEST,
  DELETE_ORDER,
  DELIVER_ORDER,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL
} from "../constants/orderConstants"
import { CLEAR_CART } from "../constants/cartConstants";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    console.log(order)
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
    const { userSignin: { userInfo } } = getState();
    const { data: { data: newOrder } } = await Axios.post("http://localhost:5000/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder });
    dispatch({ type: CLEAR_CART });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.message });
  }
}

export const listMyOrder = (order_id) =>  (dispatch,getState) => {
  try {
    dispatch({
      type: LIST_MY_ORDER_REQUEST,
    })
    const { userSignin: { userInfo } } = getState();
    console.log(userInfo.token);
    fetch('http://localhost:5000/api/orders/'+order_id, {
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token
      }
    }).then(res => res.json()).then(data =>
      dispatch({
        type: LIST_MY_ORDER,
        payload: data
      })
    );
  }
  catch(e) {
  }
}

export const listAllOrder = () => (dispatch, getState) => {
  try{
  dispatch({
      type: FETCH_ORDER_REQUEST
  })
  const { userSignin: { userInfo } } = getState();
  fetch('http://localhost:5000/api/orders', {
    headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + userInfo.token
  }
  }).then(res => res.json())
      .then(orders =>
        dispatch({
          type: FETCH_ORDER,
          payload: orders
        })
      ).catch(error => console.log(error));
  }
  catch(e){
  }
}

export const deleteOrder = (order) => (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    fetch('http://localhost:5000/api/orders/'+order._id,{
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + userInfo.token
        },
        body: JSON.stringify(order)
      })
      .then(res => res.json())
      .then(order =>
       dispatch({
         type: DELETE_ORDER,
         payload: order
       }
     )).catch(error => console.log(error));
  }
  catch(error){

  }
}

export const deliverOrder = (order) => (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    fetch('http://localhost:5000/api/orders/'+order._id+"/deliver",{
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + userInfo.token
        },
        body: JSON.stringify(order)
      })
      .then(res => res.json())
      .then(order =>
       dispatch({
         type: DELIVER_ORDER,
         payload: order
       }
     )).catch(error => console.log(error));
  }
  catch(error){

  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("http://localhost:5000/api/orders/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`http://localhost:5000/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

