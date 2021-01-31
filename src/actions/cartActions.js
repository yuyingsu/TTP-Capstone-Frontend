import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CHANGE_QTY_IN_CART,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT
} from '../constants/cartConstants';

export const addToCart = (product_id, qty) =>  (dispatch) => {
  try {
    fetch('http://localhost:5000/api/products/' + product_id).
    then(res => res.json()).then(data => {
      dispatch({
        type: ADD_TO_CART,
        payload: data,
        qty: qty
      });
    });
  } catch (error) {
    console.log(error)
  }
}

export const deleteFromCart = (product_id) =>  (dispatch,getState) => {
  dispatch({
    type: DELETE_FROM_CART,
    payload: product_id
  })
  localStorage.setItem("cartItems", getState().ct.carts);
}

export const changeQtyInCart = (product_id, qty) => (dispatch,getState) => {
  dispatch({
    type: CHANGE_QTY_IN_CART,
          payload: product_id,
          qty
  })
  localStorage.setItem("cartItems", getState().ct.carts);
}

export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

export const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
