import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PERCHACE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSucess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSucess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + "'";
    axios
      .get("/orders.json?auth=" + queryParams)
      .then((res) => {
        // console.log(res);
        const fetcheOrder = [];
        for (let key in res.data) {
          fetcheOrder.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSucess(fetcheOrder));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
