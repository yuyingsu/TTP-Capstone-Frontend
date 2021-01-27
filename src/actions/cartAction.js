import { ADD_TO_CART, DELETE_FROM_CART, CHANGE_QTY_IN_CART } from '../constants/productConstants';
import Cookie from "js-cookie";
export const addToCart = (product_id, qty) =>  (dispatch,getState) => { 
    try{
        fetch('http://localhost:5000/api/products/'+product_id).
        then(res => res.json()).then(data =>
        dispatch({
            type: ADD_TO_CART,
            payload: data,
            qty:qty
          })
          );
        const cart = getState();
        Cookie.set("cartItems", JSON.stringify(cart));
    }
    catch(e){
    }
    }
export const deleteFromCart = (product_id) =>  (dispatch,getState) => { 
    try{
        fetch('http://localhost:5000/api/products/'+product_id).
        then(res => res.json()).then(data =>
        dispatch({
            type: DELETE_FROM_CART,
            payload: data
          }));
        const cart = getState();
        Cookie.set("cartItems", JSON.stringify(cart));
    }
    catch(e){
    }
    }
export const changeQtyInCart = (product_id, qty) => (dispatch,getState) => {
    try{
        fetch('http://localhost:5000/api/products/'+product_id).
        then(res => res.json()).then(data =>
        dispatch({
            type: CHANGE_QTY_IN_CART,
            payload: data,
            qty
          }));
        const cart = getState();
        Cookie.set("cartItems", JSON.stringify(cart));
    }
    catch(e){
    }
    }