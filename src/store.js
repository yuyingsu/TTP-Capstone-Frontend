import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import cartReducers from './reducers/cartReducers'
import Cookie from 'js-cookie'
import {
  createOrderReducer,
  listAllOrderReducer,
  listMyOrderReducer
} from './reducers/orderReducers'
import {
  productReducers,
  productReviewSaveReducer,
  productDetailsReducer,
  productSaveReducer
} from './reducers/productReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import { loadState, saveState } from './components/localStorage';

const cartItems = loadState()||[];
const userInfo = Cookie.getJSON('userInfo') || null;
console.log(cartItems);
const initialState = {
  ct : {carts: cartItems, shipping:{}, payment:{}},
  userSignin: { userInfo }
};
const rootReducer = combineReducers({
  ct: cartReducers,
  createOrder: createOrderReducer,
  listAllOrder: listAllOrderReducer,
  listMyOrder: listMyOrderReducer,
  pds: productReducers,
  productDetails: productDetailsReducer,
  productReviewSave: productReviewSaveReducer,
  productSave: productSaveReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer
});

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => {
  saveState(store.getState().ct.carts);
});
export default store;
