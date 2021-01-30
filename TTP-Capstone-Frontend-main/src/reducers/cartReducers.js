import * as actionTypes from '../constants/cartConstants';

function cartReducers ( state = {} , action ) {
    switch (action.type) {
      case actionTypes.ADD_TO_CART:
      console.log(state.carts);
      let newCarts = [...state.carts];
      if (action.payload) {
        let newItem = action.payload;
        newItem.qty = action.qty;
        if (newCarts.some(e => e._id == newItem._id)) {
          newCarts.map(item => item._id == newItem._id ? newItem:item);
        } else {
          newCarts.push(newItem);
        }
      }
      return {
        ...state,
        carts: newCarts
      }
        case actionTypes.DELETE_FROM_CART:
            let newCart = [...state.carts];
            return {
                ...state,
                carts: newCart.filter(x => x._id != action.payload)
            }
        case actionTypes.CHANGE_QTY_IN_CART:
            let item = state.carts.find(cart => cart._id == action.payload);
            item.qty = action.qty;
            return {
                    ...state,
                    carts: state.carts.map(e => e._id == item._id ? item:e)
            }
        case actionTypes.CART_SAVE_SHIPPING:
          return { ...state, shipping: action.payload };
        case actionTypes.CART_SAVE_PAYMENT:
          return { ...state, payment: action.payload };
        default:
        return state;
        }

};

export default cartReducers;
