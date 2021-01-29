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
  DELIVER_ORDER
} from "../constants/orderConstants"

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

