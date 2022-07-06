import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.useId);
  }

  render() {
    let order = <Spinner />;
    if (!this.props.loading) {
      order = this.props.orders.map((item, index) => {
        return (
          <Order
            key={item.id}
            ingrediets={item.ingredient}
            pirce={item.price}
          />
        );
      });
    }
    return <div>{order}</div>;
  }
}
const mapStateToProp = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, useId) =>
      dispatch(actions.fetchOrders(token, useId)),
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
