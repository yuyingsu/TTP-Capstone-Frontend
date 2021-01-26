import { FETCH_PRODUCT_PAGE_REQUEST, FETCH_PRODUCT_PAGE_SUCCESS, 
         FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from '../constants/productConstants';
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