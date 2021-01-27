import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import cartReducers from './reducers/cartReducers'
import Cookie from 'js-cookie'
import { productReducers, productReviewSaveReducer, productDetailsReducer, productSaveReducer } from './reducers/productReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};

const rootReducer = combineReducers({
  ct: cartReducers,
  pds: productReducers,
  productDetails: productDetailsReducer,
  productReviewSave: productReviewSaveReducer,
  productSave: productSaveReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(thunk))
);
export default store;
