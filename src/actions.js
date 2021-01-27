import { FETCH_PRODUCT_PAGE, FETCH_ALL_PRODUCT} from './types';
    export const nextPage = (page) => dispatch => {
        fetch('http://localhost:5000/api/products?page='+page)
          .then(res => res.json())
          .then(products =>
            dispatch({
              type: FETCH_PRODUCT_PAGE,
              payload: products
            })
          ).catch(error => console.log(error));
      }
    export const fetchAllProduct = () => dispatch => {
        fetch('http://localhost:5000/api/products')
          .then(res => res.json())
          .then(products =>
            dispatch({
              type: FETCH_ALL_PRODUCT,
              payload: products
            })
          ).catch(error => console.log(error));
      }
      export const
      