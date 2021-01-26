import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import productReducers from './reducers/productReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const rootReducer = combineReducers({
    pds: productReducers,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
});

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
);
export default store;
