import { TramRounded } from '@material-ui/icons';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  LIST_MY_ORDER,
  LIST_MY_ORDER_REQUEST,
  FETCH_ORDER,
  FETCH_ORDER_REQUEST,
  DELETE_ORDER,
  DELIVER_ORDER,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS
} from '../constants/orderConstants';

function createOrderReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function listAllOrderReducer(state = {}, action){
  switch(action.type){
    case FETCH_ORDER_REQUEST:
      return {
          loading:true
      };
    case FETCH_ORDER:
      return {
        ...state,
        loading:false,
        orders: action.payload,
        success: true
      }
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(item => item._id !== action.payload._id)
      }
    case DELIVER_ORDER:
      return {
        ...state,
        orders: state.orders.map(item => item._id != action.payload._id ? item:action.payload)
      }
    default: return state;
  }
}

function listMyOrderReducer(state = {}, action) {
  switch(action.type){
    case LIST_MY_ORDER_REQUEST:
      return { loading:true };
    case LIST_MY_ORDER:
      return {
        ...state,
        myOrder: action.payload,
        loading: false,
        success: true,
        leave : true
      }
    default: return state;
  }
}

function myOrderListReducer(state = {
  orders: []
}, action) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export {
  createOrderReducer,
  listAllOrderReducer,
  listMyOrderReducer,
  myOrderListReducer,
  orderPayReducer
}
