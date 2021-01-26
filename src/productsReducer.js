import * as actionTypes from './types';
const initialState = {
    products:[],
    productPage:[]
};

const campusesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_PRODUCT_PAGE:
        return {
            ...state,
            productPage: action.payload
        }
        case actionTypes.FETCH_ALL_PRODUCT:
        return {
            ...state,
            products: action.payload
        }
        default:
        return state;
        }

};

export default campusesReducer;