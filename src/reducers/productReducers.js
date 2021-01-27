import * as actionTypes from '../constants/productConstants';
const initialState = {
    products:[],
    productList:[],
    loading:true
};

const productReducer = ( state = initialState, action ) => {
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
            return {
                ...state,
                loading: false, 
                productList: action.payload 
            };
        default:
        return state;
        }

};

export default productReducer;
