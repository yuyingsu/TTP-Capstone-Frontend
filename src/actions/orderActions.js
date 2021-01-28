import Axios from 'axios';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
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
