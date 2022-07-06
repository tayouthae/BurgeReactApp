import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuiltControls from "../../components/Burger/BuiltControls/BuiltControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../../src/axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.oninitIngredient();
    // axios
    //   .get("https://my-react-burger-a2d1e.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredient: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatedPurchasableState(ingredient) {
    const sum = Object.keys(ingredient)
      .map((item, index) => {
        return ingredient[item];
      })
      //console.log(sum);
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.props.ings,
  //   };
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGEREDIENT_PRICES[type];
  //   const oldPrice = this.props.ings.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.props.ings.setState({
  //     ingredient: updatedIngredient,
  //     totalPrice: newPrice,
  //   });
  //   this.props.ings.updatedPurchasableState(updatedIngredient);
  // };

  // removeIngredientHandler = (type) => {
  //   const currentIngredientValue = this.props.ings[type];
  //   const newIngredientValue = currentIngredientValue - 1;
  //   const ingredientCopy = { ...this.props.ings };
  //   ingredientCopy[type] = newIngredientValue;
  //   const decreasedPrice = INGEREDIENT_PRICES[type];
  //   const oldPrice = this.props.ings.state.totalPrice;
  //   const newPrice = oldPrice - decreasedPrice;
  //   this.props.ings.setState({
  //     ingredient: ingredientCopy,
  //     totalPrice: newPrice,
  //   });
  //   this.props.ings.updatedPurchasableState(ingredientCopy);
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.props.ings.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    // const ingredientVal = [];

    // for (let i in this.props.ings) {
    //   ingredientVal.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ings[i])
    //   );
    // }
    // ingredientVal.push("Price=" + this.props.ings.state.totalPrice);

    // const queryString = ingredientVal.join("&");
    // this.props.ings.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Coundn't load</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredient={this.props.ings} />
          <BuiltControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchabele={this.updatedPurchasableState(this.props.ings)}
            price={this.props.prince}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.props.ings}
          purchasedCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPriceInOrder={this.props.prince.toFixed(2)}
        />
      );
    }

    return (
      <Auxiliary>
        {
          <Modal
            show={this.state.purchasing}
            cancelPurchase={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
        }
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredient,
    prince: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    oninitIngredient: () => dispatch(actions.initIngredient()),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
