import * as actionTypes from '../constants/productConstants';
const initialState = {
    products:[],
    productList:[],
    loading:true
};

const productReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_PRODUCT_REQUEST:
    return {
      ...state,
      loading:true,
      product:[]
    }
    case actionTypes.FETCH_PRODUCT_PAGE_REQUEST:
      return {
        ...state,
        loading:true,
        productList:[]
    }
    case actionTypes.FETCH_PRODUCT_SUCCESS:
    return {
      ...state,
      loading: false,
      products: action.payload
    };
    case actionTypes.FETCH_PRODUCT_PAGE_SUCCESS:
      let len = 0;
      if (action.total) {
        len = action.total.length;
      }
      return {
        ...state,
        loading: false,
        productList: action.payload,
        total: len
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload)
      }
    case actionTypes.EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(item => item._id == action.payload._id ? action.payload: item)
      }
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(item => item._id !== action.payload._id)
      }
    default:
    return state;
  }
};

function productDetailsReducer(state = { product: { reviews: [] } }, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case actionTypes.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case actionTypes.PRODUCT_REVIEW_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.PRODUCT_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case actionTypes.PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {productReducers, productDetailsReducer, productSaveReducer, productReviewSaveReducer};
