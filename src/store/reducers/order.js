import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../Shared/untility";

const initalState = {
  orders: [],
  loading: false,
  purchased: false,
};

const orderReduer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCESS:
      return updateObject(state, { orders: action.orders, loading: false });
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PERCHACE_BURGER_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.PURCHASE_BURGER_SUCESS:
      const newOrder = {
        ...action.orderData,

        id: action.orderId,
      };
      return {
        ...state,
        purchased: true,
        loading: false,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReduer;
