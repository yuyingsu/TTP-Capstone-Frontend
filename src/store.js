import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import cartReducers from './reducers/cartReducers'
import {
  createOrderReducer,
  listAllOrderReducer,
  listMyOrderReducer,
  myOrderListReducer,
  orderPayReducer,
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
const userInfo = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = {
  ct : {carts: cartItems, shipping:{}, payment:{}},
  userSignin: { userInfo }
};

const rootReducer = combineReducers({
  ct: cartReducers,
  createOrder: createOrderReducer,
  listAllOrder: listAllOrderReducer,
  listMyOrder: listMyOrderReducer,
  myOrderList: myOrderListReducer,
  orderPay: orderPayReducer,
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
