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
        case actionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: state.products.push(action.payload)
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

export default productReducer;
