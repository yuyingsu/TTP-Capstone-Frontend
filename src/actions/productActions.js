import { FETCH_PRODUCT_PAGE_REQUEST, FETCH_PRODUCT_PAGE_SUCCESS,
  FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from '../constants/productConstants';
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