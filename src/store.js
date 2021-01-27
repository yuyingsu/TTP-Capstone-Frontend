import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import cartReducer from './reducers/cartReducer';
import productReducers from './reducers/productReducers';
import Cookie from 'js-cookie';
const cartItems = Cookie.getJSON('cartItems') || [];
const initialState = {
  carts: { cartItems }
};
const rootReducer = combineReducers({
  pds:productReducers,
  ct: cartReducer
});
const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(thunk))
);
export default store;
