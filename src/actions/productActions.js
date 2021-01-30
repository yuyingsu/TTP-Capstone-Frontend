import Axios from "axios";
import axios from "axios";
import { FETCH_PRODUCT_PAGE_REQUEST, FETCH_PRODUCT_PAGE_SUCCESS,
  FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
        PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_FAIL, PRODUCT_REVIEW_SAVE_SUCCESS
       } from '../constants/productConstants';

export const listProducts = (page, searchKeyword, sortOrder) => dispatch => {
dispatch({
 type: FETCH_PRODUCT_PAGE_REQUEST
});
fetch('http://localhost:5000/api/products?page='+page+
 '&searchKeyword='+searchKeyword+'&sortOrder='+sortOrder)
   .then(res => res.json())
   .then(products =>
     dispatch({
       type: FETCH_PRODUCT_PAGE_SUCCESS,
       payload: products
     })
   ).catch(error => console.log(error));
}

export const listAllProducts = () => dispatch => {
 dispatch({
 type: FETCH_PRODUCT_REQUEST
 });
 fetch('http://localhost:5000/api/products')
     .then(res => res.json())
     .then(products =>
       dispatch({
         type: FETCH_PRODUCT_SUCCESS,
         payload: products
       })
     ).catch(error => console.log(error));
 }

 export const addEditProduct = (product) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    console.log(userInfo);
    if (!product._id) {
      fetch('http://localhost:5000/api/products',{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + userInfo.token
        },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(product =>
       dispatch({
         type: ADD_PRODUCT,
         payload: product
       })
     ).catch(error => console.log(error));
    } else {
      fetch('http://localhost:5000/api/products/'+product._id,{
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization : 'Bearer ' + userInfo.token
        },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(product =>
       dispatch({
         type: EDIT_PRODUCT,
         payload: product
       })
     ).catch(error => console.log(error));
    }
  } catch (error) {
    console.log("error");
  }
};

export const deleteProduct = (product) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    fetch('http://localhost:5000/api/products/'+product._id,{
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + userInfo.token
        },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(product =>
       dispatch({
         type: DELETE_PRODUCT,
         payload: product
       }
     )).catch(error => console.log(error));
  }
  catch(error){

  }
}

export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await Axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/products/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

export const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};
